require('dotenv').config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const url = `http://localhost:3000/api/users/verify`

const createTransporter = async () => {

    // Create a variable equal to an instance of an "OAuth2" object
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    // Use a built-in method named "setCredentials" to set the refresh token value
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    // Get a new access token when it expires
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log(err)
            }
            resolve(token);
        });
    });
    // Create transport object from nodemailer instance with gmail service and OAuth2 credentials
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });
    return transporter;
};

// use the defined "transport" variable and use the sendMail method to pass the "emailOptions" object
// "emailOptions" : who sends what to whom
const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
};

exports.sendEmailUser = (usermail, username, token) => {

    sendEmail({
        subject: "Vérifiez votre adresse e-mail",
        // html body
        html: `<h2>${username},</h2>
               <h4>Nous vous remercions pour votre inscription! <br>
               Veuillez vérifier votre email pour continuer...</h4>
               <a href='${url}/${token}'> Verifier adresse email</a>
               <h4>Ce lien expirera après 2 heures.</h4>`,
        to: usermail,
        from: process.env.EMAIL
    });
}
