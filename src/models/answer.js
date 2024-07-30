import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    id: {type: String, required: true},
    user_id: {type: String, required: true},
    post_id: {type: String, required: true},
    content: {type: String, required: true},
    created_at: {type: String, required: true},
})

export default mongoose.model("Answer", answerSchema)