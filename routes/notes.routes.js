const router = require("express").Router();
const mongoose = require("mongoose");
const Note = require("../models/Note.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");


router.post("/notes",isAuthenticated,(req,res,next)=>{
    const {title, tag, text,creator} = req.body;

    Note.create({title,tag,text,creator})
        .then(response=>res.json(response))
        .catch(error=>res.json(error));
});

router.get("/notes",isAuthenticated,(req,res,next)=>{
    const user = req.payload;

    Note.find()
        .then(allNotes=>{
            const userNotes = allNotes.filter(note=>note.creator.name=== user.name)
            return res.json(userNotes)
        })
        .catch(error=>res.json(error));
});

router.get("/notes/:noteId",isAuthenticated,(req,res,next)=>{
    const {noteId} = req.params;
    const user = req.payload;

    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    }

    Note.findById(noteId)
        .then(note=>{
            const userSingleNote = note.filter(singleNote=>singleNote.creator.name===user.name)
            return res.status(200).json(userSingleNote)
        })
        .catch(error=>res.json(error));

});

router.put("/notes/:noteId",isAuthenticated,(req,res,next)=>{
    const {noteId}= req.params;
    const user = req.payload;
    
    if(!mongoose.Types.ObjectId.isValid(noteId)){
        res.status(400).json({message:'Specified Id is not valid.'});
        return;
    };

    Note.findByIdAndUpdate(noteId,req.body,{new:true})
        .then((updatedNote)=>{
            const userUpdatedNote = updatedNote.filter(singleUpdatedNote=>singleUpdatedNote.creator.name===user.name)
            return res.status(200).json(userUpdatedNote)
        })
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