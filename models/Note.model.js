const {Schema,model}= require('mongoose');

const noteSchema = new Schema(
    {
        title: {
            type:String,
            required: [true,"name required"],
        },
        tag: {
            type:String,
            required: [true,"tag required"],
        },
        text: {
            type: String,
            required: [true,"write your text here"],
        },
        creator: {
            type: Schema.Types.ObjectId, ref:'User'
        }
    },
    {
        timestamps: true,
    }
);

const Note = model("Note", noteSchema);

module.exports = Note;