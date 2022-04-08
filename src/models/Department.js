import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    minlength: [5, "Department name must be 5 or more characters"],
  },
  school: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "School",
  },
});

export default mongoose.model("Department", DepartmentSchema);
