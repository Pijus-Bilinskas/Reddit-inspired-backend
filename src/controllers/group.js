import {v4 as uuidv4} from "uuid"
import GroupModel from "../models/group.js"


export const INSERT_GROUP = async (req, res) => {
    try{

        const group = new GroupModel({
            id: uuidv4(),
            name: req.body.name,
            image: req.body.image,
            created_at: new Date(),
        })

        const response = await group.save()
        return res.status(200).json({group: response})
    } catch (err) {
        return res.status(500).json("An error occurred while inserting a group")
    }
}

export const ALL_GROUPS = async (req, res) => {
    try{
        const groups = await GroupModel.find();
        return res.status(200).json({ groups: groups });
    } catch(err){
        return res.status(500).json("An error occurred while retrieving all groups")
    }
}

export const DELETE_GROUP_BY_ID = async (req, res) => {
    try{
        const group = await GroupModel.findOne({ id: req.params.id })

        if(!group) {
            return res.status(404).json({message: "No group with such ID was found"})
        }
        const response = await group.deleteOne();
        return res.status(200).json({ message: "Group deleted successfully", response })
    }catch(err){
        return res.status(500).json("An error occorred while deleting the question")
    }
}

