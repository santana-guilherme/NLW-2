import nodemailer from 'nodemailer';
import path from 'path'
import 'dotenv/config'
import hbs from 'nodemailer-express-handlebars'

var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialDirs: path.resolve('./src/resources/mail/')
  },
  viewPath: path.resolve(__dirname,'../resources/mail/'),
  extName: '.html',
}));

export default transporter;
