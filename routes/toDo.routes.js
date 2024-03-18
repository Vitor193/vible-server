const router = require("express").Router();
const mongoose = require("mongoose");
const ToDo = require("../models/ToDo.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");


router.post("/todo",isAuthenticated,(req,res,next)=>{
    const {title,topic,creator} = req.body;

    ToDo.create({title,topic,creator})
        .then(response=>res.json(response))
        .catch(error=>res.json(error))

});

router.get("/todo",isAuthenticated,(req,res,next)=>{
    const user = req.payload;

    ToDo.find()
        .then(allToDo=>{
            const userAllToDo = allToDo.filter(singleToDo=>singleToDo.creator.name === user.name)
            return res.json(userAllToDo)
        })
        .catch(error=>res.json(error));
});


router.get("/todo/:toDoId",isAuthenticated,(req,res,next)=>{
    const {toDoId} = req.params;
    const user = req.payload;

    if(!mongoose.Types.ObjectId.isValid(toDoId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    }

    ToDo.findById(toDoId)
        .then(todo=>{
            const userSingleToDo = todo.filter(singleToDo=>singleToDo.creator.name === user.name)
            return res.status(200).json(userSingleToDo)
        })
        .catch(error=>res.json(error));

});

router.put("/todo/:toDoId",isAuthenticated,(req,res,next)=>{
    const {toDoId} = req.params;
    const user = req.payload;

    if(!mongoose.Types.ObjectId.isValid(toDoId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    }

    ToDo.findByIdAndUpdate(toDoId,req.body,{new:true})
        .then((updatedToDo)=>{
            const userUpdatedToDo = updatedToDo.filter(singleUpdatedToDo=>singleUpdatedToDo.creator.name === user.name)
            return res.status(200).json(userUpdatedToDo)
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
        .then(()=>res.json({message:`the Todo ${toDoId} was removed sucessfully.`}))
        .catch(error=>res.json(error));

});


module.exports = router;
