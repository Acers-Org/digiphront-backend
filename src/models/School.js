import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
  {
    school_name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      minlength: [5, "School name must be 5 or more characters"],
      maxlength: [150, "name can not be more than 150 characters"],
    },
    category: {
      type: String,
      default: "University",
      trim: true,
      minlength: [
        5,
        "school category must be 5 or more characters. Examples are University, Colledge, Secondary School, etc",
      ],
    },
    address: {
      lines: [],
      postcode: {
        type: String,
        default: "",
        trim: true,
      },
      city: {
        type: String,
        trim: true,
        minlength: [3, "city must be 6 or more characters"],
      },
      state: {
        type: String,
        trim: true,
        minlength: [3, "city must be 6 or more characters"],
      },
      country: {
        type: String,
        trim: true,
        minlength: [3, "city must be 6 or more characters"],
      },
    },
    location: {
      latitude: {
        type: Number,
        default: 0,
      },
      longitude: {
        type: Number,
        default: 0,
      },
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    approved: {
      type: Boolean,
      default: false,
    },
    school_logo: {
      type: String,
      trim: true,
      default: "school_logo_url",
    },
  },
  { timestamps: true }
);

export default mongoose.model("School", SchoolSchema);
