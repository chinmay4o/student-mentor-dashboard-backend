import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    mentorId : String,
    mentorName : String
});

export const Students = mongoose.model("student" , studentSchema);