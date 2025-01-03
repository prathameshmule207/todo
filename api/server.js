const env = require('dotenv');
env.config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
PORT = process.env.PORT;
const app = express();
// const Todo = require('./models/Todo');
app.use(express.json());
app.use(cors());
app.use(require("./routes/paths"))
console.log(JSON.stringify({mongoURI : process.env.URI}))
mongoose.connect(`${process.env.URI}`).then(() => console.log("Connected to MongoDB")).catch(console.error);
app.listen(PORT,()=>{
	console.log("Listening on port",PORT)
});