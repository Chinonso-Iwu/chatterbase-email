const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send", async (req, res) => {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: "chatterbase@gmail.com",
            to,
            subject,
            text,
        });

        res.status(200).send("Email sent!");
    } catch (err) {
        res.status(500).send("Failed to send email");
    }
});

app.listen(3000, () => console.log("Server running"));
