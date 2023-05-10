const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

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

    // User's password confirmation (used for validation)
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },

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

userSchema.methods.correctPassword = function (plainPassword, userPassword) {
  // Compare plain password with hashed password and return result
  return bcrypt.compare(plainPassword, userPassword);
};

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually MODIFIED
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 8);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  // Call next middleware
  next();
});

// Mongoose middleware to set passwordChangedAt field when password is changed
userSchema.pre("save", function (next) {
  // If password was not modified or user is new, skip this middleware
  if (!this.isModified("password") || this.isNew) return next();

  // Set passwordChangedAt field to current time minus 1 second
  this.passwordChangedAt = Date.now() - 1000;

  // Calling next middleware
  next();
});

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
