const express = require('express');
const app = express()

require('dotenv').config()
const port = process.env.PORT;


const cors = require("cors")
app.use(cors())
const mongoose = require("mongoose")
const database_path = process.env.MONGO_URL;

mongoose.connect(database_path)
  .then(() => { console.log('Connected with database') })
  .catch((err) => {
    console.log('Error from connection database', err);
    process.exit(1)
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use("/student", require("./routes/student.routes"))
app.use("/classes", require("./routes/classes.routes"))
app.use("/fee", require("./routes/fee.routes"))
app.use("/unpaidfee", require("./routes/unpaidfee"));


app.listen(port, () => { console.log(`Server is running on port ${port}`) });