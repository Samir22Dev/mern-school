const mongoose = require("mongoose")
const classSchema = mongoose.Schema({
    classname: { type: String, trim: true, required: true },
    ispresent: { type: String, trim: true, required: true },
}, { timespans: true }
)

const Classes = mongoose.model("class", classSchema)
module.exports = Classes;