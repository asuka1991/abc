import mongoose from "mongoose";
 
const ChatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});
 
const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
