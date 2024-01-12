const User = require("../models/user");

// CRUD - Create, Read, Update, Delete

// @desc    Register users
// @route   POST  /api/v1/users
// @access  Public
exports.registerUser = async () => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ name, email, password });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    // Send verification email to the user
    // sendVerificationEmail(newUser.email, newUser.verificationToken);
    return res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// @desc    Get all users
// @route   GET  /api/v1/users
// @access  Private
exports.getUsers = () => {};

// @desc    Get user By Id
// @route   GET   /api/v1/users/:id
// @access  Private
exports.getUserById = () => {};

// @desc    Update a user
// @route   PUT   /api/v1/users/:id
// @access  Private
exports.updateUser = () => {};

// @desc    Delete user
// @route   PUT    /api/v1/users/:id
// @access  Private
exports.deleteUser = () => {};
