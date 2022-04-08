import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  class_title: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    minlength: [5, "Title must be 5 or more characters"],
  },
  description: String,
  teacher: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
  duration: {
    class_date: Date,
    start_time: String,
    end_time: String,
  },
  venue: {},
  upcoming: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Class", ClassSchema);
