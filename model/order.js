const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  pickup: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  recipientName: {
    type: String,
    required: true,
    trim: true
  },
  recipientNumber: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: "in transit",
  }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    pickup: Joi.string().required(),
    destination: Joi.string().required(),
    recipientName: Joi.string().required(),
    recipientNumber: Joi.string()
      .min(11)
      .max(11)
      .required(),
    status: Joi.string()
  };

  return Joi.validate(order, schema);
}

module.exports.Order = Order;
module.exports.validate = validateOrder;
