const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/bubuchitos-orders-uses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("error connecting to mongodb", err));

const User = require("./models/user");
const Order = require("./models/order");

const updateOrder = async (req, res) => {
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
    res.json({ message: "Something Went Wrong" });
  }
};
updateOrder(
  {
    params: {
      orderId: "6542c8a02025940f602e4594",
    },
    body: {
      delivered: true,
    },
  },
  { json: (data) => console.log(data) }
);
