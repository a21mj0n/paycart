const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category_id: {
    type: ObjectId,
    ref: 'Category',
  },
});

module.exports = model('Brand', schema);