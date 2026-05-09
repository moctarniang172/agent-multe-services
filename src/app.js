require('dotenv').config();
const conxion = require("./config/config");
const express = require("express");
const cors = require("cors");

conxion();

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', require("./routes/"));

app.get('/',(req,res)=>{
    res.json({message: "Bienvenue a RED PRODUCT !"})
});

module.exports = app;


