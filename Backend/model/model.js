
import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    Validation: {
      validator: function (value) {
        if (value.length < 2) return false;

        for (let i = 0; i < value.length; i++) {
          const ch = value[i];
          if (
            !(
              (ch >= "A" && ch <= "Z") ||
              (ch >= "a" && ch <= "z") ||
              ch === " "
            )
          ) {
            return false;
          }
        }
        return true;
      },
      message:
        "Name must be at least 2 letters and contain only letters and spaces",
    },
  },

  age: {
    required: true,
    type: Number,
    validate: {
      validator: function (value) {
        if (value < 5 || value > 100) {
          return false;
        }
        return true;
      },
      message: "Age must be between 5 and 100",
    },
  },

  roll: {
    required: true,
    type: Number,
    validate: {
      validator: (v) => {
        const s = v.toString();
        if (v <= 0) return false;
        for (let i = 0; i < s.length; i++) {
          if (s[i] < "0" || s[i] > "9") return false;
        }
        return s.length <= 4;
      },
      message: "Roll must be numeric and 1–9999",
    },
  },

  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        let at = false;
        let dot = false;

        for (let i = 0; i < v.length; i++) {
          if (v[i] === "@") {
            at = true;
          } else if (at && v[i] === ".") {
            dot = true;
          }
        }
        return at && dot;
      },
      message: "Invalid email format",
    },
  },

  gender: {
    required: true,
    type: String,
    validate: {
      validator: function (v) {
        const validGenders = ["Male", "Female", "Other"];
        for (let i = 0; i < validGenders.length; i++) {
          if (v === validGenders[i]) {
            return true;
          }
        }
        return false;
      },
      message: "Gender must be 'Male', 'Female', or 'Other'",
    },
  },

  contact: {
    required: true,
    type: Number,
    validate: {
      validator: function (value) {
        const str = value.toString();
        let count = 0;
        for (let i = 0; i < str.length; i++) {
          count++;
        }
        return count === 10;
      },
      message: "Contact number must be 10 digits",
    },
  },

  dob:{
    required:true,
    type:Date,
    validate:{
      validator:function(v){
        return v <= new Date()
      },
       message: "Date of Birth cannot be in the future",
    },
  },

  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [5, "Address must be at least 5 characters long"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("students", studentSchema);
