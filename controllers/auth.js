const User = requirei("../models/user.js");

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// @desc    Log user in
// @route   POST  /api/v1/auth/
// @access  Public
exports.logUserIn = async (req, res) => {
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
};
