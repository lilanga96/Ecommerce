const nodemailer = require('nodemailer');
require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    logger: true, 
    debug: true, 
});


transporter.verify((error, success) => {
    if (error) {
        console.error("Error with transporter:", error);
    } else {
        console.log("Server is ready to send emails");
    }
});


app.post('/send-invoice', async (req, res) => {
    console.log("POST request received at /send-invoice");
    console.log("Request Body:", req.body);

    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
        console.error("Invalid request: Missing fields");
        return res.status(400).json({ message: "Missing required fields: 'to', 'subject', or 'html'" });
    }

    try {
        const info = await transporter.sendMail({
            from: 'isintu@isintu.org.za',
            to,
            subject,
            html,
        });
        console.log("Email sent successfully. Message ID:", info.messageId);
        return res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });
    } catch (error) {
        console.error("Error during email send:", error.message);
        return res.status(500).json({ message: "Failed to send email", error: error.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
