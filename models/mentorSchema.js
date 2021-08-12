import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
    fname: {
        type : String,
        required: true,
    },
    lname: {
        type : String,
        required: true,
    },
    subject: String
});

export const Mentors = mongoose.model("mentor" , mentorSchema);
