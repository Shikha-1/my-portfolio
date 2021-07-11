const express = require("express");
const app = express();
require("dotenv").config();

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const path = require("path");

const staticPath = path.join(__dirname, "./public/src/");
app.use(express.static(staticPath));

const viewPath = path.join(__dirname, "./template/views");
app.set("view engine", "hbs");
app.set("views", viewPath);

const hbs = require("hbs");
const partialPath = path.join(__dirname, "./template/partials");
hbs.registerPartials(partialPath);

const router = require("./route");
const PORT = process.env.PORT || 8080;

app.use(router);
app.use(express.json());

async function sendMail(req) {
  try {
    const CLIENTID = process.env.CLIENTID;
    const CLIENTSECRET = process.env.CLIENTSECRET;
    const REDIRECTURI = process.env.REDIRECTURI;
    const REFRESHTOKEN = process.env.REFRESHTOKEN;

    const oAuth2Client = new google.auth.OAuth2(
      CLIENTID,
      CLIENTSECRET,
      REDIRECTURI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESHTOKEN });

    const ACCESSTOKEN = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: CLIENTID,
        clientSecret: CLIENTSECRET,
        refreshToken: REFRESHTOKEN,
        accessToken: ACCESSTOKEN,
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: process.env.EMAIL,
      subject: `Message from ${req.body.name}: ${req.body.sub}`,
      text: req.body.comment,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

app.post("/contact", (req, res) => {
  sendMail(req)
    .then(async (result) => {
      console.log("success ", result);
      res.send("success");
    })
    .catch((error) => {
      console.log(error);
      res.send("error");
    });
});

app.listen(PORT, (err) => {
  !err
    ? console.log(`listening to port ${PORT}`)
    : console.log(`Error! ${err.message}!`);
});