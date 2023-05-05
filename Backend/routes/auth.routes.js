const { Router } = require("express");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong! Please try again later",
      });
    }

    const user = await UserModel({
      firstName,
      lastName,
      company,
      email,
      password: hash,
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
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  const hash = user?.password;

  if (!user) {
    return res
      .status(401)
      .json({ status: false, message: "Incorrect Email or Password!" });
  }

  bcrypt.compare(password, hash, async function (err, results) {
    if (err) {
      return res
        .status(400)
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
});

module.exports = { authController };
