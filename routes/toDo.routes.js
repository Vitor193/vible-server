const router = require("express").Router();
const mongoose = require("mongoose");
const ToDo = require("../models/ToDo.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");


router.post("/todo",isAuthenticated,(req,res,next)=>{
    const {title,topic} = req.body;
    const creator = req.payload._id;

    ToDo.create({title,topic,creator})
        .then(response=>res.json(response))
        .catch(error=>res.json(error))

});

router.get("/todo",isAuthenticated,(req,res,next)=>{
    const user = req.payload._id;

    ToDo.find({creator:user})
        .then(response=>res.json(response))
        .catch(error=>res.json(error));
});


router.get("/todo/:toDoId",isAuthenticated,(req,res,next)=>{
    const {toDoId} = req.params;
    const user = req.payload._id;

    if(!mongoose.Types.ObjectId.isValid(toDoId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    }

    ToDo.findById(toDoId)
        .then(toDo=>{
            if(toDo.creator.toString()!== user.toString()){
                return res.status(403).json({message:"Unauthorized access to toDo"})
            }
            return res.status(200).json(toDo)
        })
            
        .catch(error=>res.json(error));

});

router.put("/todo/:toDoId",isAuthenticated,(req,res,next)=>{
    const {toDoId} = req.params;
    const user = req.payload._id;

    if(!mongoose.Types.ObjectId.isValid(toDoId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    }

    ToDo.findByIdAndUpdate(toDoId,req.body,{new:true})
        .then((updatedToDo)=>{
            if(updatedToDo.creator.toString()!== user.toString()){
                return res.status(403).json({message:"Unauthorized access to toDo"})
            }
            return res.status(200).json(updatedToDo)
        })
        .catch(error=>res.json(error))

});

router.delete("/todo/:toDoId",isAuthenticated,(req,res,next)=>{
    const {toDoId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(toDoId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    };

    ToDo.findByIdAndDelete(toDoId)
        .then((deletedToDo)=>{
            if(!deletedToDo){
                return res.status(404).json({message:"ToDo not found."})
            }
            return res.json({message:`the Todo ${toDoId} was removed sucessfully.`})})
        .catch(error=>res.json(error));

});


module.exports = router;
