import Message from "../models/Message.js";
import asyncWrapper from "../middlewares/async.js";
import { createCustomError } from "../utils/custom-error.js";

const setQueryObject = (query, userId) => {
  const { received, sent } = query;
  let queryObj = [];
  if (sent) {
    queryObj.push({ from: userId });
  }
  if (received) {
    queryObj.push({ to: userId });
  }
  return queryObj.length ? queryObj : [{ from: userId }, { to: userId }];
};

export const getMessages = asyncWrapper(async (req, res) => {
  // A user can only view messages sent by him and to him
  const userId = req.user.id;
  const queryObj = setQueryObject(req.query, userId);
  let sortValue = { createdAt: 1 };
  if (req.query.sort) {
    sortValue = { sort: 1 };
  }
  const messages = await Message.find()
    .or(queryObj)
    .populate("to")
    .populate("from")
    .sort(sortValue);

  res.status(200).json({
    message: "User messages",
    data: messages,
    success: 1,
  });
});

export const createMessage = asyncWrapper(async (req, res) => {
  const from = req.user.id;
  const { subject, body, to } = req.body;
  const msgs = [];
  for (let receiver of to) {
    msgs.push({
      subject,
      body,
      to: receiver,
      from,
    });
  }
  const messages = await Message.insertMany(msgs);
  if (!messages) {
    throw createCustomError("Could not send messages", 422);
  }
  res.status(200).json({
    message: "Message(s) sent",
    data: messages,
    success: 1,
  });
});
