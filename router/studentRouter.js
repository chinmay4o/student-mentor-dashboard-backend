import { Mentors } from "../models/mentorSchema.js";
import express from "express";
import { Students } from "../models/studentSchema.js";

const router = express.Router();

//getting all students
router.get("/students", async (req, res) => {
  const allStudents = await Students.find();
  res.send(allStudents);
});

//adding students to database
router.post("/addstudents", async (req, res) => {
  const { fname, lname } = req.body;
  // if (!name) res.status(422).send("name is invalid");

  try {
    const regStudent = new Students({
      fname,
      lname,
    });
    await regStudent.save();
    res.send(regStudent);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

//delete request
router.delete("/studentDelete", async (req, res) => {
  const { id } = req.body;
  const delStudent = await Students.findOne({ _id: id });
  if (delStudent) {
    await delStudent.remove();
    console.log("Student deleted" + delStudent);
    res.send(delStudent);
  } else {
    res.json({ error: "No user Found" });
  }
});

//adding mentor and id to students list with patch request
router.patch("/assignmentor", async (req, res) => {
  const { mentorId, mentorName, studentList } = req.body;
  if (!mentorId) {
    res.status(422).send({ error: "provide correct id" });
  }
  if (!studentList) {
    res.status(422).send({ error: "provide students" });
  }

  studentList.map(async (ele, index) => {
    const newStudent = await Students.findOne({ _id: ele });

    newStudent.mentorId = mentorId;
    newStudent.mentorName = mentorName;
    await newStudent.save();
  });
  res.send({ success: "success from server" });
});

// edit request for student - initial
router.post("/getstudent", async (req, res) => {
  const { idd } = req.body;

  const requestedStudent = await Students.findOne({ _id: idd });
  if (!requestedStudent) {
    return res.status(422).send({ error: "no student with this id found" });
  } else {
    res.send(requestedStudent);
  }
});

//edit request for student - patch update fname and lname
router.patch("/updatestudents", async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(422).send({ error: "no student object found" });
  } else {
    const updatedStu = await Students.findOne({ _id: data._id });
    if (!updatedStu) {
      res.status(422).send({ error: "no student object found" });
    } else {
      console.log(updatedStu);
      updatedStu.fname = data.fname;
      updatedStu.lname = data.lname;
      await updatedStu.save();
      res.send(updatedStu);
    }
  }
});

export const studentRouter = router;
