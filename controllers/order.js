const Order = require("../models/Order");
const User = require("../models/User");

// @desc    Create order
// @route   POST  /api/v1/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create an array of product objects from thecart Items
    const products = cartItems?.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item.price,
      image: item?.image,
    }));

    // create a new order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "order cretated successfully" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
};

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");

    if (!orders) {
      res.status(404).json({ message: "Orders not found" });
    }

    console.log(orders);

    res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Error rethrieving the orders" });
  }
};

// @desc    Get a specific order
// @route   GET /api/v1/orders/:orderId
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order)
      return res
        .status(404)
        .send({ message: `No order With Id ${req.params.orderId}` });

    res.status(200).send({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something Went Wrong", error });
  }
};

// @desc    Get orders from a user
// @route   GET /api/v1/orders/:userId/user
// @access  Private
exports.getOrdersByUserId = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.userId });

    res.status(200).send({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something Went Wrong", error });
  }
};

// @desc    Update order
// @route   PUT /api/v1/orders/:orderId
// @access  Private
exports.updateOrder = async (req, res) => {
  try {
    const result = await Order.updateOne(
      { _id: req.params.orderId },
      {
        $set: req.body,
      }
    );

    console.log(result);

    res.json({ success: true, data: result });
  } catch (error) {
    console.error(
      `Error Deleting Order With _id: ${req.params.orderId}\n\n`,
      error
    );
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

// @desc    Delete order
// @route   DELETE  /api/v1/orders/:orderId
// @access  Private
exports.deleteOrder = async (req, res) => {
  try {
    const result = await Order.deleteOne({ _id: req.params.orderId });

    console.log(result);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      `Error Deleting Order With _id: ${req.params.orderId}\n\n`,
      error
    );
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
