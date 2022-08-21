const nodemailer = require("nodemailer");

const main = async () => {

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            fullname: req.payload.fullname,
            email: req.payload.email,
            password: req.payload.password,
        },
    });

    let info = await transporter.sendMail({
        from: '"Admin Blanja" <admin@agung.com>',
        to: email,
        subject: "Account Verification",
        html: `<h1>Email Confirmation</h1>
    <h2>Hello ${fullname}</h2>
    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
    </div>`,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

main().catch(console.error);
