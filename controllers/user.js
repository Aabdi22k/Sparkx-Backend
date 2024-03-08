import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error, "Error in getUsers controller");
    res.status(404).json({ error: "Internal Server Error" });
  }
};
