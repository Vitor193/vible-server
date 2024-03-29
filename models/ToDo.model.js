const {Schema, model } = require("mongoose");

const toDoSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "name required"],
        },
        topic: {
            type:String,
            required: [true,"topic required"],
        },
        creator: {
            type: Schema.Types.ObjectId, ref:"User"
        }
    },
    {
        timestamps:true,
    }
);

const ToDo = model("ToDo", toDoSchema);


module.exports = ToDo;