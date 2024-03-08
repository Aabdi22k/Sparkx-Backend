import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authorize = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - user not found" });
    }
    req.userId = user._id;

    next();
  } catch (error) {
    console.log(error, "Error in authorization middleware");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authorize;
