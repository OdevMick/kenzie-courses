import nodemailer from "nodemailer";
import { config } from "dotenv";
import path from "path";
import hbs, { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import { ErrorHandler } from "../errors/errors";

interface ICourseEmail{
  name: string,
  email: string,
  courseName: string,
  duration: string,
  subject: string
}

config()
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASWORD
  }
});

const sendEmail = (info: ICourseEmail) => {
  const { name, email, courseName, duration,subject } = info;
  let resObj = {};
  const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      partialsDir: path.resolve("./src/views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/views/"),
  };

  transport.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: "teste@mail.com", 
    to: email, 
    subject,
    template: "email",
    context: {
      name,
      courseName,
      duration
    },
  };

  transport.sendMail(mailOptions, (err) => {
    if(err) {
      throw new ErrorHandler(400, err.message)
    }else{
      console.log("EMAIL SENT")
    }
  })
}
export {
  transport,
  sendEmail
};