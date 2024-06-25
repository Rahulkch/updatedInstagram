const express = require('express');
const app = express()
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const cors = require("cors");
const path = require("path")

app.use(cors())
require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.use(require("./routes/user"))


// datbase
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then( () => console.log("db is connection succesfully"))
.catch((e) => {
    console.log("issue in connecting data bse ",e);
})





mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})

// serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})


app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})