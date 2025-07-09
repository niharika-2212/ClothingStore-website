import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  phone:{
    type: String,
  },
  address:{
    type: String,
  },
  city:{
    type: String,
  },
  state:{
    type: String,
  },
  country:{
    type: String,
  },
  pincode:{
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
