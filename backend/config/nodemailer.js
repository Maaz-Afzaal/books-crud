const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.FROM_EMAIL,
		pass: process.env.PASSWORD,
	},
});

// Send the email
function sendEmail(opt) {
	transporter.sendMail(opt, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

module.exports = { sendEmail };
