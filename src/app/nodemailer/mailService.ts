import * as nodemailer from 'nodemailer';
import Environment from '../../config/environments';

export class MailService {

  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: Environment.MAIL_HOST,
      port: Environment.MAIL_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: Environment.MAIL_AUTH_USER,
        pass: Environment.MAIL_AUTH_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('MailServer is ready to take our messages');
      }
    });
  }

  public async sendVerificationMail(to: string, key: string)
    : Promise<void> {
    const subject = 'Corona-Helfer E-Mail Verification';
    const content = `Bitte bestätige deinen Account: ${key}`;

    const options = {
      from: {
        name: Environment.MAIL_ADDRESS_NAME,
        address: Environment.MAIL_ADDRESS || Environment.MAIL_AUTH_USER,
      },
      to,
      subject,
      text: content,
    };

    return new Promise<void>(
      (resolve: (msg: any) => void,
       reject: (err: Error) => void) => {
        this.transporter.sendMail(
          options, (error, info) => {
            if (error) {
              console.log(`error: ${error}`);
              reject(error);
            } else {
              resolve(`Message Sent ${info.response}`);
            }
          });
      });
  }
}

// const mailService = new MailService();
// mailService.sendVerificationMail(
//   'sapzalp@gmail.com',
//   '12342214523',
// ).then((msg) => {
//   console.log(`sendMail result :(${msg})`);
// });
