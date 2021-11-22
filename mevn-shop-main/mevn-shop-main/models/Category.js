const { model, Schema } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'bell',
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = model('Category', schema);