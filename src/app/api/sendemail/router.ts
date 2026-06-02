import nodemailer from "nodemailer";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {

    try {
    const { name, email} = await request.json();

    const userMail = process.env.USER_MAIL;
    const PassMail = process.env.USER_PASS;

    if (!name || !email) {
        return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: userMail,
            pass: PassMail,
        },
    });

    const htmlContent = `
    <h1>Hello ${name}</h1>
    <p>Thank you for contacting us</p>
    <p>Your email is ${email}</p>
    `;

    const mailOptions = {
        from: userMail,
        to: email,
        subject: "Contact Form Submission",
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
} catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
}
}