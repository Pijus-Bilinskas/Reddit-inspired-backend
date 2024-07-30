import {v4 as uuidv4} from "uuid"
import AnswerModel from "../models/answer.js"
import PostModel from "../models/post.js";
import UserModel from "../models/user.js"
import LikeModel from "../models/like.js"
import DislikeModel from "../models/dislike.js"


export const INSERT_ANSWER = async (req, res) => {
    try{
        const post = await PostModel.findOne({id: req.params.id })

        const answer = new AnswerModel({
            id: uuidv4(),
            user_id: req.user.user_id,
            post_id: post.id,
            content: req.body.content,
            created_at: new Date(),
        })

        const response = await answer.save();
        return res.status(200).json({answer: response})
    } catch(err){
        return res.status(500).json("An error occurred while inserting the answer")
    }
}

export const GET_ALL_ANSWERS_WITH_POST = async (req, res) => {
    try{
        const post = await PostModel.findOne({id: req.params.id})
        const answers = await AnswerModel.find({post_id: req.params.id})

        return res.status(200).json({
            post: post,
            answers: answers
        })
    } catch(err){
        return res.status(500).json("An error occurred retrieving post and answers")
    }
}

export const DELETE_ANSWER = async (req, res) => {
    try{
        const answer = await AnswerModel.findOne({id: req.params.id })
        const response = await answer.deleteOne();
        return res.status(200).json({ message: "Answer deleted successfully", response });
    } catch(err){
        return res.status(500).json("An error occurred deleting answer")
    }
}

export const DISLIKE_ANSWER = async (req, res) => {
    try {
        const user = await UserModel.findOne({ id: req.user.user_id });
        const answer = await AnswerModel.findOne({ id: req.params.id });
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        const existingDislike = await DislikeModel.findOne({ user_id: user.id, answer_id: answer.id });
        if (existingDislike) {
            await DislikeModel.deleteOne({ _id: existingDislike._id });
            return res.status(200).json({ message: "Answer un-disliked successfuly" });
        }

        const dislike = new DislikeModel({
            user_id: user.id,
            answer_id: answer.id,
        });

        await dislike.save();
        return res.status(200).json({ message: "Answer disliked successfuly" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while disliking answer" });
    }
};

export const LIKE_ANSWER = async (req, res) => {
    try {
        const user = await UserModel.findOne({ id: req.user.user_id });
        const answer = await AnswerModel.findOne({ id: req.params.id });
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        const existingLike = await LikeModel.findOne({ user_id: user.id, answer_id: answer.id });
        if (existingLike) {
            await LikeModel.deleteOne({ _id: existingLike._id });
            return res.status(200).json({ message: "Answer unliked successfuly" });
        }

        const like = new LikeModel({
            user_id: user.id,
            answer_id: answer.id,
        });

        await like.save();
        return res.status(200).json({ message: "Answer liked successfuly" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while liking answer" });
    }
};