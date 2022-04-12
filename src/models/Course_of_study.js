import mongoose from "mongoose";

const COSSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide cos name"],
    trim: true,
    minlength: [5, "Name must be 5 or more characters"],
  },
  status: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Department",
  },
});

export default mongoose.model("Course_of_study", COSSchema);
