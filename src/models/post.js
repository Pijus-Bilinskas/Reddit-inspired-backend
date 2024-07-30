import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    id: {type: String, required: true},
    group_id: {type: String, required: true},
    user_id: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    created_at: {type: String, required: true},
})

export default mongoose.model("Post", postSchema)