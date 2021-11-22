const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { routes } = require('./routes');

// connection to mongoDB
mongoose.connect(process.env.MONGO_DB_URI || config.get('mongoDBUrl'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Mongo connected');
});

// configure express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
routes.forEach((item) => {
  app.use(`/api/${item}`, require(`./routes/${item}`));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/spa'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/spa', 'index.html'));
  });
}

// init app
const PORT = process.env.PORT || config.get('port');
http.createServer({}, app).listen(PORT);

console.log(`Server started on port ${PORT}`);
