import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
      console.log("Passwords do not match");
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
      console.log("Username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/username?username=${fullname.replace(
      / /g,
      ""
    )}`;

    const newUser = new User({
      fullname,
      username,
      password: hashPassword,
      profilePic,
    });

    if (!newUser) {
      res.status(400).json({ error: "Problem creating user" });
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15 days",
    });

    await newUser.save();

    res.status(201).json({ token });
  } catch (error) {
    console.log(error, "Error in signup controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      console.log("Incorrect Password");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log(error, " Error in login controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
