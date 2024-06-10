import User from "../models/user.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import generateTokenAndCookie from "../utils/generateToken.js";
import sendVerificationEmail from "../utils/mailer.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    //userid and password verification
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //if user is not verified, send the message
    if (!user.isVerified) {
      return res.status(400).json({ error: "The user is not yet verified" });
    }

    //on successfull verification
    generateTokenAndCookie(user._id, res);
    res.status(201).json({
      message: "Logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log({ Error: error, message: "error in login controller" });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exist" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      return res
        .status(400)
        .json({ error: "Username must be a valid email id" });
    }

    //Hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const pin = crypto.randomInt(100000, 999999).toString();
    await sendVerificationEmail(username, pin);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      isVerified: false,
      profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
      verificationPin: pin,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          gender: newUser.gender,
          isVerified: newUser.isVerified,
          profilePicture: newUser.profilePicture,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log({ Error: error, message: "error in signup controller" });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verify = async (req, res) => {
  try {
    const { username, verificationPin } = req.body; // Renamed token to verificationPin for clarity
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.verificationPin === verificationPin) {
      user.isVerified = true;
      user.verificationPin = ""; // Clear the verification pin once it's used
      await user.save();
      return res.status(200).json({ message: "User verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid verification PIN" });
    }
  } catch (error) {
    console.log({ Error: error, message: "Error in verify controller" });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log({ Error: error, message: "error in logout controller" });
    res.status(500).json({ error: "Internal server error" });
  }
};
