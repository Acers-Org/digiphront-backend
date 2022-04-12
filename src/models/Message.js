import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "must provide subject"],
      trim: true,
      minlength: [5, "Subject must be 5 or more characters"],
      maxlength: [400, "name can not be more than 400 characters"],
    },
    body: {
      type: String,
      required: [true, "must provide body"],
      trim: true,
      minlength: [5, "Message body should be 5 or more characters"],
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
