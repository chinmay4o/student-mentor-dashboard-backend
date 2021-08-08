import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    subject: String
});

export const Mentors = mongoose.model("mentor" , mentorSchema);
