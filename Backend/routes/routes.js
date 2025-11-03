

import express from 'express';
import Student from '../model/model.js'; 

const router = express.Router();

async function getStudent(req, res, next) {
    let student;
    try {
        student = await Student.findById(req.params.id);
        if (student == null) {

            return res.status(404).json({ message: 'Cannot not found' });
        }
    } catch (err) {
       
        return res.status(500).json({ message: err.message });
    }

    res.student = student; 
    next(); 
}

router.post('/students', async (req, res) => {
    console.log("Received Data:", req.body);
    const data = new Student({
        name: req.body.name,
        age: req.body.age,
        roll: req.body.roll,
        email: req.body.email,
        gender: req.body.gender,
        contact: req.body.contact,
        dob:req.body.dob,
        address:req.body.address
    });

    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/students', async (req, res) => {
    try {
        const data = await Student.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/students/:id', getStudent, (req, res) => {
    res.json(res.student);
});


router.patch('/students/:id', getStudent, async (req, res) => {

    if (req.body.name != null) res.student.name = req.body.name;
    if (req.body.age != null) res.student.age = req.body.age;
    if (req.body.roll != null) res.student.roll = req.body.roll;
    if (req.body.email != null) res.student.email = req.body.email;
    if (req.body.gender != null) res.student.gender = req.body.gender;
    if (req.body.contact != null) res.student.contact = req.body.contact;
    if(req.body.dob!=null)res.student.dob = req.body.dob;
    if(req.body.address!=null) res.student.address = req.body.address

    try {
        const updatedStudent = await res.student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.delete('/students/:id', getStudent, async (req, res) => {
    try {
        await res.student.deleteOne();
        res.json({ message: 'Student data successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
export default router;