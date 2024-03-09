const {Schema,model}= require('mongoose');

const noteSchema = new Schema(
    {
        name: {
            type:String,
            required: [true,"name required"],
        },
        tag: {
            type:String,
            required: [true,"tag required"],
        },
        updateDate: {
            type: Date,
        },
        text: {
            type: String,
            required: [true,"write your text here"],
        },
    },
    {
        timestamps: true,
    }
);

const Note = model("Note", noteSchema);

module.exports = Note;