import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    image: {type: String, required: false},
    created_at: {type: String, required: true},
})

export default mongoose.model("Group", groupSchema)