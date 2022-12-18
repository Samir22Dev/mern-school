const mongoose = require("mongoose")
const feeSchema = mongoose.Schema({
    fee_month: { type: String, trim: true, required: true },
    amount: { type: Number, trim: true, required: true },
    pay_date: { type: Date },
    class_name: { type: String, trim: true, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
    fee_status: { type: String, default: "UNPAID" }
}, { timespans: true }
)

const Fee = mongoose.model("fee", feeSchema)

module.exports = Fee;