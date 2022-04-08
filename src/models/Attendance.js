import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  class: { type: mongoose.SchemaTypes.ObjectId, ref: "Class" },
  attendance_records: [
    {
      time_in: String,
      time_out: String,
      duration: Number,
    },
  ],
});

export default mongoose.model("Attendance", AttendanceSchema);
