const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    unique: false,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  userName: { type: String },
  savedleagues: [{ type: Object }],
  leagues: [{ type: Schema.Types.ObjectId, ref: "Leagues" }],
  profilePic: { type: String, required: false },
});

const User = model("User", userSchema);

module.exports = User;
