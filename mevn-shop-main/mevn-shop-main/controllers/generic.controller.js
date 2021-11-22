const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const genericCrud = (model) => ({
  async get({ params: { id }, query: { include: includes } }, response) {
    try {
      const _with = [];

      if (includes) {
        includes.split(',').forEach(include => {
          _with.push({
            path: include,
          });
        });
      }
      const item = await model.findById(id).populate(_with);

      return response.status(200).send(item);
    } catch (error) {
      c;
      return response.status(400).send(boom.boomify(error));
    }
  },
  async getAll({ query: { include: includes } }, response) {
    try {
      const _with = [];

      if (includes) {
        includes.split(',').forEach(include => {
          _with.push({
            path: include,
          });
        });
      }
      const item = await model.find().populate(_with);

      return response.status(200).send(item);
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async create({ body }, response) {
    try {
      const item = new model(body);
      const newItem = await item.save();
      return response.status(200).send(newItem);
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async update({ params: { id }, body }, response) {
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return response.status(200).send(item);
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async delete({ params: { id } }, response) {
    try {
      await model.findByIdAndDelete(id);
      return response
        .status(200)
        .send({ status: 'OK', message: `${id}'s product has been deleted !` });
    } catch (error) {
      return response.status(400).send(boom.boomify(error));
    }
  },
  async register(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Email or Password is incorrect',
        });
      }

      const { email, password } = req.body;

      const candidate = await model.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'User is already have' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new model({
        email,
        password: hashedPassword,
      });
      await user.save();

      return res.status(200).json({ message: 'User successfully created' });

    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Email or Password is incorrect',
        });
      }

      const { email, password } = req.body;

      const userExist = await model.findOne({ email });
      if (!userExist) {
        return res.status(400).json({ message: 'User with this email does not have' });
      }

      const isPasswordMatch = await bcrypt.compare(password, userExist.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'User password is incorrect' });
      }

      const token = JWT.sign(
        { userId: userExist.id },
        config.get('JWTSecretKey'),
        { expiresIn: '1h' },
      );

      res.json({
        token,
        userId: userExist.id,
      });

    } catch (e) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
});

module.exports = genericCrud;
