import mongoose from "mongoose";

const COSSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    minlength: [5, "Name must be 5 or more characters"],
  },
  duration: {
    start_date: Date,
    end_date: Date,
  },
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Department",
  },
});

export default mongoose.model("Course_of_study", COSSchema);
