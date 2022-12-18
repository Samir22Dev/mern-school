const express = require("express")
const router = express.Router()
const mongoose = require('mongoose');
const Fee = require("../modal/fee.modal");
const dayjs = require('dayjs');


router.get("/", async (req, res) => {
    try {
        const unpaidfee = await Fee.find({ fee_status: 'UNPAID' });
        const paidfee = await Fee.find({ fee_status: 'PAID' });
        res.json({ 'unpaid': unpaidfee.length, 'paid': paidfee.length });
    }
    catch (error) {
        console.log('Following error occured from count unpaid route.\n\n', error);
    }
});

//----------------- GENERATE FEES --------------------

router.get("/getfee", async (req, res) => {

    checkDate = dayjs().format('MMM-YYYY');

    try {
        const fee = await Fee.findOne({ fee_month: `${checkDate}` });
        console.log('getfee name from server: ', fee);
        if (fee == null) {
            res.json(fee);
        } else {
            res.json('Already exist');
        }
    }
    catch (error) {
        console.log('Following error occured from getfee route.\n\n', error);
    }
});
module.exports = router;