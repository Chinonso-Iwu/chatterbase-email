const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(express.json());
app.use(cors());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send", async (req, res) => {

    const { to, subject, html } = req.body;

    try {
        const data = await resend.emails.send({
            from: "ChatterBase <onboarding@resend.dev>",
            to: to,
            subject: subject,
            html: html,
        });

        console.log("Email sent:", data);

        res.status(200).send("Email sent successfully!");

    } catch (error) {
        console.log("Error sending email:", error);
        res.status(500).send("Failed to send email");
    }
});

app.listen(3000, () => console.log("Server running"));