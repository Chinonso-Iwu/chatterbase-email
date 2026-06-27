const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
app.use(express.json());
app.use(cors());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/test-email", async (req, res) => {
    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "chinonso1311@gmail.com", // change this
            subject: "Test Email from ChatterBase",
            html: "<h1>Hello 👋</h1><p>If you see this, Resend is working!</p>",
        });

        console.log(data);
        res.send("Email sent successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Email failed");
    }
});

app.listen(3000, () => console.log("Server running"));
