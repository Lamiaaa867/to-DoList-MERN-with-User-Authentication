import { userModel } from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/generateToken.js";
//=========================sign up===================
export const signUp = async (req, res, next) => {
  const { name, email, password, phone, tasks } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(409).json({ error: "email already exists" });
  }

  const hashedPass = bcrypt.hashSync(password, +process.env.salt_level);
  const userInstance = new userModel({
    name: name,
    email,
    phone,
    password: hashedPass,
    tasks
  });
  if (userInstance) {
    await generateToken(userInstance._id, res);

    await userInstance.save();
    return res.status(201).json({
      message :"success",
      _id: userInstance._id,
      name: userInstance.name,
      phone: userInstance.phone,
      email: userInstance.email,
    });
  } else {
    return res.status(400).json({ error: "invalid user data" });
  }
};

//========================log in =============================
export const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (!isUserExist ) {
      return res.status(409).json({ error: "email not found, please sign up" });
    }
    const isMatch = bcrypt.compareSync(password, isUserExist.password);
    if (!isMatch) {
      return res.status(409).json({ error: "Wrong password" });
    }
    await generateToken(isUserExist._id, res);
    return res.status(200).json({
      message :"success",
      user:{
      _id: isUserExist._id,
     email :isUserExist.email,
      name: isUserExist.name,
      }
    });
  };
  //========log out
  export const logOut = async (req, res, next) => {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      message: "Logged out succesful",
    });
  };
  