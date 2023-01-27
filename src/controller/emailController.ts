import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { google } from 'googleapis';


class EmailController {
  OAuth2Client;

  constructor() {
    this.OAuth2Client = new google.auth.OAuth2(process.env.EMAIL_CLIENT_ID, process.env.EMAIL_CLIENT_SECRET, process.env.EMAIL_REDIRECT_URI);
    this.OAuth2Client.setCredentials({
      refresh_token: process.env.EMAIL_REFRESH_TOKEN
    });
  }

  private async createTransport() {
    const accessToken = await this.OAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'work.alexeevs@gmail.com',
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token || ''
      }
    });
  }

  public async sendEmail(data: Mail.Options) {
    const transport = await this.createTransport();

   try {
     await transport.sendMail({
       from: 'Shop 👻" <work.alexeevs@gmail.com>',
       to: data.to,
       subject: data.subject,
       text: data.text,
       html: data.html
     });
   } catch(error) {
      throw error
   }
  }
}

export default EmailController;
