// Require nodemailer module for sending email
const nodemailer = require("nodemailer");
// Require ejs module for rendering email templates
const ejs = require("ejs");
// Require fs module for reading files
const fs = require("fs");
// Require html-to-text module for converting html to plain text
const htmlToText = require("html-to-text");

// Export Email class
module.exports = class Email {
  // Constructor to set email parameters
  constructor(user, url) {
    // User email
    this.to = user.email;
    // User first name
    this.firstName = user.firstName;

    this.url = url;
    // Sender email address and name
    this.from = `GetHarvest <${process.env.EMAIL_FROM}>`;
  }

  // Create a new transporter for sending email using SendGrid
  newTransporter() {
    // SendGrid implementation here
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
    // return nodemailer.createTransport({
    //   // Use environment variables to store email settings
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USERNAME,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });
  }

  // Send email with provided email template and subject
  async send(template, subject) {
    // Compile the email template with the user's name
    const renderedTemplate = await ejs.render(
      fs.readFileSync(`${__dirname}/templates/${template}.ejs`, "utf-8"),
      {
        name: this.firstName,
        url: this.url,
      }
    );

    // Email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: renderedTemplate,
      text: htmlToText.convert(renderedTemplate),
    };

    // Send email using transporter
    await this.newTransporter().sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  // Send welcome email to user
  async sendWelcomeEmail() {
    await this.send("welcome-email", "Welcome to our website!");
  }

  async sendPasswordReset() {
    await this.send("reset-password-email", "Reset your Harvest ID password");
  }
};
