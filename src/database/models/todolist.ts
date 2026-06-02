/*import mongoose from "mongoose";

const schema = mongoose.Schema;

const TodolistShema = new schema ({
    title: String,
    state : String,
    dataStart: Date,
    dataEnd: Date,
});
*/

import { Schema, model, models } from "mongoose";

const todolistSchema = new Schema({
    title: {
        type: String,
        required: [true, "El titulo es requerido"],
    },
    state: {
        type: String,
        required: [true, "El titulo es requerido"],

    },
    dataStart: {
        type: Date,
        required: true,
    },
    dataEnd: {
        type: Date,
    },
});

const Todolist = models.todolist || model("todolist", todolistSchema);

export default Todolist;