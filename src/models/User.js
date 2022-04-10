import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    othernames: String,
    email: {
      type: String,
      validate: {
        validator: function (email) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(email);
        },
        message: "A valid email is required",
      },
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    account_settings: {
      email_verification_token: {
        type: String,
        select: false,
      },
      email_verified: {
        type: Boolean,
        default: false,
      },
      account_status: {
        type: Boolean,
        default: true,
      },
    },
    school: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "School",
    },
    admin: {
      job_title: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [
          5,
          "job title must be 5 or more characters. FOr example manager, proprietor, registrar",
        ],
      },
    },
    teacher: {
      department: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Department",
      },
      job_title: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [
          5,
          "job title must be 5 or more characters. FOr example manager, proprietor, registrar",
        ],
      },
      courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Courses" }],
    },
    student: {
      course_of_study: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course_of_study",
      },
      study_status: {
        level: {
          type: String,
          trim: true,
          lowercase: true,
          minlength: [1, "A student must have a level"],
        },
        completed: false,
        graduated: false,
        certificate: {},
        grades: [
          {
            session: {
              start: Date,
              end: Date,
            },
            course_name: String,
            grade: String,
          },
        ],
      },
      courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Courses" }],
    },
    avatar: String,
    phone: {
      type: String,
      minLength: 11,
      maxLength: 15,
    },
    gender: String,
    dob: Date,
    address: {
      lines: [String],
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
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password);
};

export default mongoose.model("User", UserSchema);
