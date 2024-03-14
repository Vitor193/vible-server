const {Schema, model } = require("mongoose");

const toDoSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name required"],
        },
        topic: {
            type:String,
            required: [true,"topic required"],
        },
    },
    {
        timestamps:true,
    }
);

const ToDo = model("ToDo", toDoSchema);


module.exports = ToDo;