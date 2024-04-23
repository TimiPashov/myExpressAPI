const { Schema, model, Types } = require("mongoose");

const EMAIL_PATTERN = /^[a-zA-Z0-9\.-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => EMAIL_PATTERN.test(value),
      message: "Invalid Email!",
    },
  },
  cars: { type: Types.ObjectId, ref: "Car" },
  hashedPassword: { type: String, required: true },
});

userSchema.index(
  { username: 1, email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
