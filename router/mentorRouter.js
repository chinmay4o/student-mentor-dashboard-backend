import express from "express";
import {Mentors} from "../models/mentorSchema.js";
const router = express.Router();


router.get("/mentors" , async(req, res) => {
    const data = await Mentors.find();
    res.send(data);
})

router.post("/addmentors", async (req, res) => {
  const { name } = req.body;
  const newMentor = await Mentors.findOne({ name: name });
  if(newMentor){
      console.log(newMentor);
  }
  try {
    const regMentor = new Mentors({ name: name });
    await regMentor.save();
    res.send("success");
  } catch (err) {
      console.log(err);
      res.status(422).send(err);
  }
});


export const mentorRouter = router;