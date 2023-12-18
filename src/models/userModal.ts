import mongoose from "mongoose";

let User;

try {
  // Try to retrieve the existing model to avoid OverwriteModelError
  User = mongoose.model("user");
} catch (error) {
  // If the model doesn't exist, create and compile it
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type:String
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  });

  User = mongoose.model("user", userSchema);
}

export { User };
