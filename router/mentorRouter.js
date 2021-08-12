import express from "express";
import {Mentors} from "../models/mentorSchema.js";
const router = express.Router();


router.get("/mentors" , async(req, res) => {
    const data = await Mentors.find();
    res.send(data);
})

router.post("/addmentors", async (req, res) => {
  const { fname , lname } = req.body;
  // const newMentor = await Mentors.findOne({ fname: fname });
  // if(newMentor){
  //     console.log(newMentor);
  // }
  try {
    const regMentor = new Mentors({ fname , lname });
    await regMentor.save();
    res.send("success");
  } catch (err) {
      console.log(err);
      res.status(422).send(err);
  }
});

//delete request
router.delete("/mentorDelete", async (req, res) => {
  const { id } = req.body;
  const delMentor = await Mentors.findOne({ _id: id });
  if (delMentor) {
    await delMentor.remove();
    console.log("Student deleted" + delMentor);
    res.send(delMentor);
  } else {
    res.json({ error: "No user Found" });
  }
});

export const mentorRouter = router;