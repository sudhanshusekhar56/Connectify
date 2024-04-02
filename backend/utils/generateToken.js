import jwt from "jsonwebtoken";

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15D",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //miliSec
    httpOnly: true, //not accessible via js
    sameSite: "strict", //cross site attacks etc
    sercure: process.env.NODE_ENV != true,
  });
};

export default generateTokenAndCookie;
