import User from "../models/User.js";
import Conversation from '../models/Conversation.js'
export const getUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    res.status(200).json({users});
  } catch (error) {
    console.log(error, "Error in getUsers controller");
    res.status(404).json({ error: "Internal Server Error" });
  }
};

export const getMyConversations  = async (req, res) => {
  try {
    const userId = req.userId;
    const conversations = await Conversation.find();
    const users = []
    for (let conversation of conversations) {
      let participants = conversation.participants;
      if (!participants.includes(userId)) continue
      let i = participants.indexOf(userId)
      participants.splice(i, 1)
      let user = await User.findById(participants[0]).select("-password")
      users.push(user)
    }
    

    res.status(200).json({users});
  } catch (error) {
    console.log(error, "Error in getMyConversations controller");
    res.status(404).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error, "Error in getUser controller");
    res.status(404).json({ error: "Internal Server Error" });
  }
};
