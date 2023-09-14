import express from "express";
import ChatModel from "../src/models/chat.js";
const router = express.Router();
 
router.post("/chats", async (request, response) => {
  console.log(123)
  const chat = new ChatModel(request.body);

  try {
    await chat.save();
    response.send(chat);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/chats", async (request, response) => {
  try {
   const chats = await ChatModel.find({});
    response.send(chats);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.get("/chats/:id", async (request, response) => {
  try {
    const chat = await ChatModel.findOne({ _id: request.params.id });
    response.send(chat);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/chats/:id", async (request, response) => {
  try {
    const chat = await ChatModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    await chat.save();
    response.send(chat);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.delete("/chats/:id", async (request, response) => {
  try {
    const chat = await ChatModel.findByIdAndDelete(request.params.id);
    if (!chat) {
      return response.status(404).send("Item wasn't found");
    }
    response.status(204).send();
  } catch (error) {
    response.status(500).send({ error });
  }
});
 
export default router;
