import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      minlength: [5, "Name must be 5 or more characters"],
    },
    course_code: {
      type: String,
      required: [true, "must provide course code"],
      trim: true,
    },
    description: String,
    assessments: [],
    department: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Department",
    },
    available: {
      type: Boolean,
      default: true,
    },
    teacher: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
