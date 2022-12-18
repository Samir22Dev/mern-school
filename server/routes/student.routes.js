const express = require("express")
const router = express.Router()
const mongoose = require('mongoose');

const Student = require("../modal/student.modal")


router.get("/", async (req, res) => {
    try {
        const student = await Student.find({}).populate('classId', 'classname')
        //console.log(student);
        res.json(student);
    }
    catch (error) {
        console.log('Following error occured from get data route.\n\n', error);
    }
})

router.post("/", async (req, res) => {
    try {
        const student = new Student({
            sname: req.body.sname,
            fname: req.body.fname,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            dob: req.body.dob,
            classId: req.body.classId,
            fee: req.body.fee
        });
        const result = await student.save()
        res.json(result);
    }
    catch (error) {
        console.log('following error occured from insert student routes \n\n', error)
    }
});

router.put("/:id", async (req, res) => {

    const id = req.params.id;

    const filter = { _id: id };
    const update = {
        sname: req.body.sname,
        fname: req.body.fname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        dob: req.body.dob,
        fee: req.body.fee
    };

    let doc = await Student.findOneAndUpdate(filter, update, {
        returnOriginal: false
    });

    res.json({ msg: "student updated" });
})


router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.find({ _id: id })
        res.json(student);
    }
    catch (error) {
        console.log('Following error occured from get data route.\n\n', error);
    }
})

router.get("/email/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const student = await Student.find({ email: email })
        res.json(student);
    }
    catch (error) {
        console.log('Following error occured from get data route.\n\n', error);
    }
})

module.exports = router;