import mongoose from "mongoose";

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

const userSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
    password: {type: String, required: true},
    created_at: {type: String, required: true},
    joined_groups: {type: Array, required: true}
})

export default mongoose.model("User", userSchema)