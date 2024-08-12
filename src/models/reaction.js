import mongoose from "mongoose";

const reactionSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    post_id: { type: String, required: false },
    answer_id: { type: String, required: false },
    reaction_type: { type: String, enum: ['like', 'dislike'], required: true }
});

reactionSchema.index(
    { user_id: 1, post_id: 1, answer_id: 1 },
    {
        unique: true,
        partialFilterExpression: {
            $or: [
                { post_id: { $exists: true } },
                { answer_id: { $exists: true } }
            ]
        }
    }
);

export default mongoose.model("Reaction", reactionSchema);