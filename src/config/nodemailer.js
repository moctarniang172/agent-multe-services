require('dotenv').config();
const nodemalier = require("nodemailer");

const transporter = nodemalier.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

})

module.exports = transporter;
