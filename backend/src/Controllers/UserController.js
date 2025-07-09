import User from "../models/user.model.js"

export const userLogin = (req,res)=>{
    res.send("User Login");
}

export const userRegister = async (req,res)=>{
    const {uid, email} = req.user;
    try{
        let user = await User.findOne({ uid });
    if (!user) {
      user = new User({
        uid,
        email,
        name: req.body.name || name || "",
      });
      await user.save();
    }

    res.status(200).json({ message: "User saved successfully", user });
    }catch (err){
        console.log("error saving user: ", err)
    }
    res.send("User Register");
}