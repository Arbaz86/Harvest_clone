const { Router } = require("express");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Email = require("../utils/sendEmail");

const authController = Router();

authController.post("/signup", async (req, res) => {
  const { firstName, lastName, company, email, password } = req.body;

  const isExist = await UserModel.find({ email });

  if (isExist.length > 0) {
    return res.status(404).json({
      message: "User Already Exist! Please login",
      status: false,
    });
  }

  const user = await UserModel({
    firstName,
    lastName,
    company,
    email,
    password,
    passwordConfirm: password,
  });

  user.save(async (err, success) => {
    if (err) {
      return res.status(500).json({ message: err.message, status: false });
    }

    await new Email(user).sendWelcomeEmail();

    return res.status(201).json({
      status: true,
      message: "Signup successful!",
      ...success["_doc"],
    });
  });
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide email and password!" });
  }

  const user = await UserModel.findOne({ email });

  if (!user || !(await user.correctPassword(password, user?.password))) {
    return res
      .status(401)
      .json({ status: false, message: "Incorrect Email or Password!" });
  }

  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });

  await new Email(user).sendWelcomeEmail();

  return res
    .status(200)
    .json({ status: true, message: "Successfully Login!", token });
});

// Route handler for resetting user password
authController.post("/forgotPassword", async (req, res) => {
  // Check if a user with the given email exists in the database
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    // If no user is found with the given email, send an error response
    return res.status(404).json({
      status: false,
      message: `There is no user with email address.`,
    });
  }

  // Generate a password reset token for the user
  const resetToken = user.createPasswordRestToken();

  // Save the updated user document to the database
  await user.save({ validateBeforeSave: false });

  try {
    // Generate the reset URL using the reset token
    const resetURL = `https://getharvest-1683732837728.web.app/resetPassword/edit?email=${req.body.email}&token=${resetToken}&user_id=${user._id}`;

    // Send a password reset email to the user
    await new Email(user, resetURL).sendPasswordReset();

    // If the email is sent successfully, send a success response
    return res.status(200).json({
      status: true,
      message: `A password reset email has been sent to ${req.body.email}.`,
    });
  } catch (error) {
    // If there is an error sending the email, clear the password reset token and expiration date
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user document to the database
    await user.save({ validateBeforeSave: false });

    // Send an error response
    return res.status(500).json({
      status: false,
      message: "There was an error sending the email. Try again later!",
    });
  }
});

authController.patch("/resetPassword/:token", async (req, res) => {
  // Hash the token received in the URL
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find the user with the matching hashedToken and has not expired
  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  });

  // If no matching user is found, send an error response
  if (!user) {
    return res
      .status(400)
      .json({ status: false, message: "Token is invalid or has expired" });
  }

  // Check if the password and passwordConfirm fields in the request body match
  if (req.body.password !== req.body.passwordConfirm) {
    // If the passwords do not match, send an error response
    return res
      .status(401)
      .json({ status: false, message: "Passwords are not the same!" });
  }

  // Set the user's new password and clear the password reset token and expiration date
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // Save the updated user document to the database
  await user.save();

  // Send a success response
  return res
    .status(200)
    .json({ status: true, message: "Password Reset Successfully!" });
});

module.exports = { authController };
