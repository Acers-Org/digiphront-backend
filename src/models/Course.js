import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    minlength: [5, "Name must be 5 or more characters"],
  },
  description: String,
  assessments: [],
  duration: {
    startDate: Date,
    endDate: Date,
  },
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Department",
  },
  available: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Course", CourseSchema);
