const express = require("express")
const router = express.Router()
const mongoose = require('mongoose');

const Student = require("../modal/student.modal");
const Fee = require("../modal/fee.modal");


router.get("/", async (req, res) => {
    try {
        const fee = await Fee.find({}).populate('studentId', 'sname')
        res.json(fee);
    }
    catch (error) {
        console.log('Following error occured from all get data route.\n\n', error);
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const fee = await Fee.find({ studentId: id }).populate('studentId', 'sname')
        res.json(fee);
    }
    catch (error) {
        console.log('Following error occured from get data for edit route.\n\n', error);
    }
})

router.get("*", async (req, res) => {
    console.log('Invalid rout')
    res.json('Invalid rout');
});

router.post("/", async (req, res) => {
    try {
        const fee = new Fee({
            fee_month: req.body.fee_month,
            amount: req.body.amount,
            studentId: req.body.studentId,
            class_name: req.body.class_name
        });
        const result = await fee.save()
        res.json(result);
    }
    catch (error) {
        console.log('following error occured from insert fee routes \n\n', error)
    }
});

router.put("/:feeid/:amount", async (req, res) => {


    const feeid = req.params.feeid;
    const amount = req.params.amount;
    let date_ob = new Date();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    let fullDate = year + "-" + month + "-" + date
    const filter = { _id: feeid };

    const update = {
        pay_date: fullDate,
        fee_status: "PAID",
    };
    let doc = await Fee.findOneAndUpdate(filter, update, {
        returnOriginal: false
    });
    res.json({ msg: "student updated" });
})

router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const fee = await Fee.find({ _id: id })
        res.json(fee);
    }
    catch (error) {
        console.log('Following error occured from get data for update route.\n\n', error);
    }
})

module.exports = router;