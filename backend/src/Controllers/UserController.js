import User from "../models/user.model.js";

export const userLogin = async (req, res) => {
  const { uid, email } = req.user;
  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register." });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const userRegister = async (req, res) => {
  const { uid, email } = req.user;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({
        uid,
        email,
      });
      await user.save();
    }

    res.status(200).json({ message: "User saved successfully", user });
  } catch (err) {
    console.log("error saving user: ", err);
  }
  res.send("User Register");
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid }); // assuming uid from Firebase
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const firebaseUid = req.user.uid;

    const updatedUser = await User.findOneAndUpdate(
      { uid: firebaseUid }, // Match on Firebase UID field
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
      },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
