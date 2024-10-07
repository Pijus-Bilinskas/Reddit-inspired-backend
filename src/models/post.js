import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    id: {type: String, required: true},
    group_id: {type: String, required: true},
    user_id: {type: String, required: true},
    title: {type: String, required: true},
    content_type: {type: String,enum: ["text", "image", "video", "link"] , required: true},
    content_text: {type: String},
    content_image: {type: String},
    content_link: {type: String},
    created_at: {type: String, required: true},
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

postSchema.virtual(`reactions`, {
    ref: `Reaction`,
    localField: `id`,
    foreignField: `post_id`
});




export default mongoose.model("Post", postSchema)