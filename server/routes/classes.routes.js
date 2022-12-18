const express = require("express")
const router = express.Router()
const mongoose = require('mongoose');

const Classes = require("../modal/class.modal")

// SELECT ALL CLASSES
router.get("/", async (req, res) => {
    try {
        const classes = await Classes.find({})
        res.json(classes);
    }
    catch (error) {
        console.log('Following error occured from get data route.\n\n', error);
    }
})


// INSERT A NEW CLASS
router.post("/", async (req, res) => {
    try {
        const classes = new Classes({
            classname: req.body.classname,
            ispresent: 'Yes',
        });
        const result = await classes.save()
        console.log(result)
        res.json(result);
    }
    catch (error) {
        console.log('following error occured from insert student routes \n\n', error)
    }


});

// UPDATE A CLAASS
router.put("/:id", async (req, res) => {

    const id = req.params.id;

    const filter = { _id: id };
    const update = {
        classname: req.body.classname
    };

    let doc = await Classes.findOneAndUpdate(filter, update, {
        returnOriginal: false
    });

    console.log('Update Data:', doc);
    res.json({ msg: "classes updated" });
})


// GET ONLY ONE CLASS FOR UPDATE
router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    console.log('Class id: ', id);

    try {
        const classes = await Classes.find({ _id: id })
        console.log('std', classes);
        res.json(classes);
    }
    catch (error) {
        console.log('Following error occured from edit data route.\n\n', error);
    }
})
module.exports = router;