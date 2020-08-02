const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

//gmail account
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// the mail
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.formSubmit = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return;
        }

        const mailOptions = {
            from: gmailEmail,
            to: req.body.email,
            subject: `from my website ${req.body.email}`,
            text: req.body.message,
            html: `<p>${req.body.message}`
        };

        mailTransport.sendMail(mailOptions);

        

        res.redirect('https://3rdmwdsc.quahk.com/formSuccess.html');
    });
}); 