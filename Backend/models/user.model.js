const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    company: { type: String, required: false, trim: true },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: { type: String, required: [true, "Please provide a password"] },
    // Date when user's password was last changed
    passwordChangedAt: { type: Date, default: Date.now() },
    // User's password reset token (used for resetting password)
    passwordResetToken: String,
    // User's password reset token expiration date
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.createPasswordRestToken = function () {
  // Generate a random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken, passwordResetToken: this.passwordResetToken });

  // added 10 minutes expiry time
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
