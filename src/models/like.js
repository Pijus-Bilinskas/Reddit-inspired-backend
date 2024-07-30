import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    answer_id: {type: String, required: false},
    post_id: {type: String, required: false},
})

likeSchema.index(
    { user_id: 1, answer_id: 1, post_id: 1 },
    {
      unique: true,
      partialFilterExpression: {
        $or: [
          { answer_id: { $exists: true } },
          { post_id: { $exists: true } }
        ]
      }
    }
  );

export default mongoose.model("Like", likeSchema)