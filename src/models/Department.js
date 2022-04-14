import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DepartmentSchema.virtual("coss", {
  ref: "Course_of_study",
  localField: "_id",
  foreignField: "department",
});

DepartmentSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "department",
});

export default mongoose.model("Department", DepartmentSchema);
