import {v4 as uuidv4} from "uuid"
import PostModel from "../models/post.js"
import GroupModel from "../models/group.js"
import LikeModel from "../models/like.js"
import DislikeModel from "../models/dislike.js"
import UserModel from "../models/user.js"


export const INSERT_POST = async (req, res) => {
    try{
        const post = new PostModel({
            id: uuidv4(),
            group_id: req.params.id,
            user_id: req.user.user_id,
            title: req.body.title,
            content: req.body.content,
            created_at: new Date(),
        })

        const response = await post.save();
        return res.status(200).json({post: response})
    } catch(err){
        return res.status(500).json("An error occurred while inserting the post")
    }
}

export const GET_ALL_POSTS = async (req, res) => {
    try{
        const group = await GroupModel.findOne({id: req.params.id})
        const posts = await PostModel.find({group_id: req.params.id})

        return res.status(200).json({
            group: group,
            posts: posts
        })
    } catch(err){
        return res.status(500).json("An error occurred retrieving all posts")
    }
}

export const DELETE_POST = async (req, res) => {
    try{
        const post = await PostModel.findOne({id: req.params.id })
        const response = await post.deleteOne();
        return res.status(200).json({ message: "Post deleted successfully", response });
    } catch(err){
        return res.status(500).json("An error occurred deleting post")
    }
}

export const LIKE_POST = async (req, res) => {
    try {
        const user = await UserModel.findOne({ id: req.user.user_id });
        const post = await PostModel.findOne({ id: req.params.id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const existingLike = await LikeModel.findOne({ user_id: user.id, post_id: post.id });
        if (existingLike) {
            await LikeModel.deleteOne({ _id: existingLike._id });
            return res.status(200).json({ message: "Post unliked successfuly" });
        }

        const like = new LikeModel({
            user_id: user.id,
            post_id: post.id,
        });

        await like.save();
        return res.status(200).json({ message: "Post liked successfuly" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while liking post" });
    }
};

export const DISLIKE_POST = async (req, res) => {
    try {
        const user = await UserModel.findOne({ id: req.user.user_id});
        const post = await PostModel.findOne({ id: req.params.id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const existingDislike = await DislikeModel.findOne({ user_id: user.id, post_id: post.id });
        if (existingDislike) {
            await DislikeModel.deleteOne({ _id: existingDislike._id });
            return res.status(200).json({ message: "Post un-disliked successfuly" });
        }

        const dislike = new DislikeModel({
            user_id: user.id,
            post_id: post.id,
        });

        await dislike.save();
        return res.status(200).json({ message: "Post disliked successfuly" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while disliking post" });
    }
};