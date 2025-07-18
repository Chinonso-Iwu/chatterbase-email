const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chatterbase@gmail.com',         // Replace with your Gmail
                pass: 'wzptgyrtwqobrtgs'            // Use app password, not Gmail password
            }
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: 'chatterbase@gmail.com',            // Your Gmail again
            subject: "New message from your website",
            text: message
        });

        res.status(200).json({ success: true, message: "Email sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Email failed!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
