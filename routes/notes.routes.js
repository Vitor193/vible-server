const router = require("express").Router();
const mongoose = require("mongoose");
const Note = require("../models/Note.model");


router.post("/notes",(req,res,next)=>{
    const {title, tag, text} = req.body;

    Note.create({title,tag,text})
        .then(response=>res.json(response))
        .catch(error=>res.json(error));
});

router.get("/notes",(req,res,next)=>{
    Note.find()
        .then(allNotes=>res.json(allNotes))
        .catch(error=>res.json(error));
});

router.get("/notes/:noteId",(req,res,next)=>{
    const {noteId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    }

    Note.findById(noteId)
        .then(note=>res.status(200).json(note))
        .catch(error=>res.json(error));

});

router.put("/notes/:noteId",(req,res,next)=>{
    const {noteId}= req.params;
    
    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    };

    Note.findByIdAndUpdate(noteId,req.body,{new:true})
        .then((updatedNote)=>res.json(updatedNote))
        .catch(error=>res.json(error));

});

router.delete("/notes/:noteId",(req,res,next)=>{
    const {noteId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    };

    Note.findByIdAndDelete(noteId)
        .then(()=>res.json({message:`the note ${noteId} was removed sucessfully`}))
        .catch(error=>res.json(error));

});


module.exports = router;