
import jwt from "jsonwebtoken";

//=========generate token =============
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.tokenSecretKey, {
    expiresIn: "15h",
  });

  res.cookie("jwt", token, {
  //  maxAge: 15 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: false, 
  sameSite: "Lax",
  });
};
