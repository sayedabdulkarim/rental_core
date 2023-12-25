import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import { generateToken } from "../utils/generateToken.js";
//helpers

const userLogin = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const user = await UserModal.findOne({ phone });

  if (user) {
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone,
      },
      message: "Login successful",
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc register a new user
// route POST /api/users
// @access PUBLIC
const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // Check if the user already exists based on phone
  const existingUser = await UserModal.findOne({ phone });
  if (existingUser) {
    res.status(400).json({
      message: "User with this phone number already exists. Please Login.",
    });
    return;
  }

  // Check if the user already exists based on email
  const existingUserByEmail = await UserModal.findOne({ email });
  if (existingUserByEmail) {
    res
      .status(400)
      .json({ message: "User with this email already exists. Please Login." });
    return;
  }

  // Create a new user
  const newUser = new UserModal({ name, email, phone });
  await newUser.save();

  // Generate JWT token
  const token = generateToken(newUser._id);

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      name,
      email,
      phone,
    },
    token, // Include the token in the response
  });
});

// @desc logout
// route POST /api/users/logout
// @access PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  // Inform the client that the user should be logged out
  res.status(200).json({
    message: "Successfully logged out.",
  });
});

export { userLogin, userSignUp, logoutUser };
