const User = require("../models/User");

// @desc    Create Address
// @route   POST  /api/v1/addresses/
// @access  Private
exports.createAddress = async (req, res) => {
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
};

// @desc    Get addresses from a user id
// @route   GET /api/v1/addresses/:userId
// @access  Private
exports.getAddressesByUserId = async (req, res) => {
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
};

// @desc    Get an address from the user
// @route   GET /api/v1/addresses/:addressId/:userId
// @access  Private
exports.getAddressById = async (req, res) => {
  try {
    const { addressId, userId } = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.id({ _id: addressId });
    if (!address)
      return res
        .status(404)
        .json({ message: `There is no course with Id of ${addressId}` });

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Error Reathrieving the addresses" });
  }
};

// @desc    updateAddress
// @route   PUT /api/v1/addresses/:addressId/:userId
// @access  Private
exports.updateAddress = async (req, res, next) => {
  try {
    const { addressId, userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let address = user.addresses.id({ _id: addressId });
    if (!address)
      return res
        .status(404)
        .json({ message: `There is no course with Id of ${addressId}` });

    address = {
      address,
      ...req.body,
    };

    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something Went Wrong", error });
  }
};

// @desc    deleteAddress
// @route   PUT /api/v1/addresses/:addressId/:userId
// @access  Private
exports.deleteAddress = async (req, res, next) => {
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
};
