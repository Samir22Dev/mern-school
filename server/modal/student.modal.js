const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    sname: { type: String, trim: true, required: true },
    fname: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    address: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    dob: { type: Date, trim: true, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'class' },
    fee: { type: Number, trim: true, required: true }
}, { timespans: true }
)

const Student = mongoose.model("student", studentSchema)

module.exports = Student;