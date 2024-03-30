const router = require("express").Router();
const mongoose = require("mongoose");
const Note = require("../models/Note.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");
const User = require("../models/User.model")


router.post("/notes",isAuthenticated,(req,res,next)=>{
    const {title, tag, text} = req.body;
    const creator = req.payload._id;

    Note.create({title,tag,text,creator})
        .then(response=>res.json(response))
        .catch(error=>res.json(error));
});

router.get("/notes",isAuthenticated,(req,res,next)=>{
    const user = req.payload._id;

    Note.find({creator:user})
        .then(response=>res.json(response))
        .catch(error=>res.json(error));
});

router.get("/notes/:noteId",isAuthenticated,(req,res,next)=>{
    const {noteId} = req.params;
    const user = req.payload._id;

    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    }

    Note.findById(noteId)
        .then(note=>{
            if(note.creator.toString()!==user.toString()){
                return res.status(403).json({message:"Unauthorized access to note"})
            }
            return res.status(200).json(note)
        })
        .catch(error=>res.json(error));

});

router.put("/notes/:noteId",isAuthenticated,(req,res,next)=>{
    const {noteId}= req.params;
    const user = req.payload._id;
    
    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    };

    Note.findByIdAndUpdate(noteId,req.body,{new:true})
        .then((updatedNote)=>{
            if(updatedNote.creator.toString()!==user.toString()){
                return res.status(403).json({message:"Unauthorized access to note"})
            }
            return res.status(200).json(UpdatedNote)
        })
        .catch(error=>res.json(error));

});

router.delete("/notes/:noteId",isAuthenticated,(req,res,next)=>{
    const {noteId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    };

    Note.findByIdAndDelete(noteId)
        .then((deletedNote)=>{
            if (!deletedNote) {
                return res.status(404).json({ message: 'Note not found.' });
            }
            return res.json({message:`the note ${noteId} was removed sucessfully.`})})
        .catch(error=>res.json(error));

});


module.exports = router;