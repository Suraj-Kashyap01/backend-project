import mongoose from "mongoose";
import { type } from "os";

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: Number,
        require: true
    },
    role:{
        type:String
    },
    lecture:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'lecture'
    }]
})
const lectureSchema = mongoose.Schema({
    teacherEmail:{
        type:String,
    },
    lecture: {
        type: String,
    },
    subject: {
        type: String,
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    day:{
        type:String,
    },
    room: {
        type: Number,
    }
})
const leaveSchema = mongoose.Schema({
    email: {
        type: String,
    },
    from: {
        type: String,
    },
    to:{
        type:String,
    },
    reason: {
        type: String,
    },
    status:{
        type:String
    }
})
export const user = mongoose.model("user", userSchema);
export const lecture = mongoose.model("lecture", lectureSchema);
export const leave=mongoose.model("leave",leaveSchema)



