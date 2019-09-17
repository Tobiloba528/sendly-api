const auth = require('../middleware/auth');
const { Order, validate } = require("../model/order");
const mongoose = require('mongoose'); 
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  const orders = await Order.find().sort("firstname");
  res.send(orders);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order({
    pickup: req.body.pickup,
    destination: req.body.destination,
    recipientName: req.body.recipientName,
    recipientNumber: req.body.recipientNumber,
    status: req.body.status
  });

  await order.save();
  res.send(order);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      destination: req.body.destination,
      pickup: req.body.pickup,
      recipientName: req.body.recipientName,
      recipientNumber: req.body.recipientNumber,
      status: req.body.status
    },
    { new: true }
  );

  if (!order) return res.status(404).send("This ID is invalid");
  res.send(order);
});

module.exports = router;
