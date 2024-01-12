const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const morgan = require("morgan");

const listings = require("./routes/listings");

const cors = require("cors");
const port = 8000;

// app.use(cors());

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://bendito820:bendito@cluster0.feybn39.mongodb.net/socia-cart-v1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log("error connecting to mongodb", err));

const User = require("./models/User");
const Order = require("./models/Order");

//Function to send Verification email to the user

const sendVerificationEmail = async (email, verificationToken) => {
  // create a nomailer transport
  const transporter = nodemailer.createTransport({
    // configure the email service
    service: "gmail",
    auth: {
      user: "bendito820@gmail.com",
      pass: "vxakcimpofqpuwyd",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // sned the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error sending verification email", error);
  }
};

// endpoint to refister in the app

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Chech if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Create a new User  //
    const newUser = new User({ name, email, password });

    // Generate and save the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to db
    await newUser.save();

    // Send verification email to the user
    // sendVerificationEmail(newUser.email, newUser.verificationToken);
    return res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user with given verification toklen
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // chech if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Check if the password is right or not...
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login Failed" });
  }
});

// endpoint to store a new adress to the backend
app.post("/addresses", async (req, res) => {
  console.log("ROUTE HITTED");
  try {
    const { userId, address } = req.body;

    // Find the user by the UserId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // add the new address to the user's address array
    user.addresses.push(address);

    // save the upldated user in the back end
    await user.save();

    res.status(200).json({ message: "Adress created successfuly" });
  } catch (error) {
    res.status(500).json({ message: "error adding adress" });
  }
});

// @desc    Get all addresses of a user
// @route   GET /addresses/:userId
// @access  Private
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;

    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error Reathrieving the addresses" });
  }
});

// @desc    delete a specific address
// @route   DELETE  /addressess/:addressId
// @access  Private
app.delete("/addresses/:addressId/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { addressId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ message: "There is no user with Id of ", userId });

    const address = user.addresses.id({ _id: addressId });
    if (!address)
      return res
        .status(404)
        .json({ message: `There is no course with Id of ${addressId}` });

    await address.deleteOne();

    user.save();

    res.json({ success: true, data: user.addresses });
  } catch (err) {
    console.error("Something Went Wrong", err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

// endpoint to store all the order place an order
app.post("/orders", async (req, res) => {
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
});

// get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error rethrieving the user profile" });
  }
});

// get the user profile
app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "no orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

app.use("/api/listings", listings);

const path = require("path");

app.use("/images", express.static(path.join(__dirname, "public/assets")));

// Step 3: Create a route to serve the image
app.get("/assets/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "public/assets", imageName);

  res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// @desc    Get all orders
// @route   GET /orders
// @access  public
app.get("/orders", async (req, res) => {
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
});

// @desc    Deletes an Order (Finalizes it)
// @route   delete  /orders/:orderId
// @access  Public
app.delete("/orders/:orderId", async (req, res) => {
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
});

// @desc    Uodate order document
// @route   update  /orders/orderId
// @access  Public
app.post("/orders/:orderId", async (req, res) => {
  console.log(req.body);

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
});
