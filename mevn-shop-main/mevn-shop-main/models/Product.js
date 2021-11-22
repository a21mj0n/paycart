const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  category_id: {
    type: ObjectId,
    ref: 'Category',
  },
  brand_id: {
    type: ObjectId,
    ref: 'Brand'
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

module.exports = model('Product', schema);