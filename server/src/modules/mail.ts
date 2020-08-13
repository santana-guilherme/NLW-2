import nodemailer from 'nodemailer';
import path from 'path'
import { host, port, auth } from "../config/mail.json";
import hbs from 'nodemailer-express-handlebars'

var transporter = nodemailer.createTransport({
  host,
  port,
  auth
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
