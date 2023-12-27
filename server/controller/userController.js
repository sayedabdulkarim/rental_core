import asyncHandler from "express-async-handler";
//modals
import UserModal from "../modals/userModal.js";
import PropertyModal from "../modals/propertyModal.js";

import { generateToken } from "../utils/generateToken.js";
//helpers

// @desc register a new user
// route POST /api/login
// @access PUBLIC
const userLogin = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  // Find the user by phone number
  const user = await UserModal.findOne({ phone });

  if (user) {
    // Find the properties/rooms associated with the user
    const properties = await PropertyModal.find({ owner: user._id });

    // Generate a token for the user session
    const token = generateToken(user._id);

    // Prepare room data to include in the response, converting MongoDB Maps to Objects
    const roomData = properties.map((property) => ({
      ...property.toObject(),
      roomTypesContainer: {
        roomTypes: Array.from(property.roomTypesContainer.roomTypes).reduce(
          (acc, [key, value]) => {
            acc[key] = value.toObject(); // Convert subdocuments to objects
            return acc;
          },
          {}
        ),
      },
    }));

    // Send the response including the user info, token, and their rooms
    res.status(200).json({
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone,
        rooms: roomData, // Include the room data in the login response
      },
      message: "Login successful",
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc register a new user
// route POST /api/signup
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
