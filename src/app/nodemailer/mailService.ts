import * as nodemailer from 'nodemailer';
import Environment from '../../config/environments';

export class MailService {

  public static async sendVerificationMail(to: string, key: string, transporter: nodemailer.Transporter,
                                           address: string, name: string): Promise<void> {
    const subject = 'Corona-Helfer E-Mail Verification';
    const content = `Bitte bestätige deinen Account: ${key}`;

    const options = {
      from: {
        name,
        address,
      },
      to,
      subject,
      text: content,
    };

    return new Promise<void>(
      (resolve: (msg: any) => void,
       reject: (err: Error) => void) => {
        transporter.sendMail(
          options, (error, info) => {
            if (error) {
              console.log(`error: ${error}`);
              reject(error);
            } else {
              resolve(`Verification message sent to: ${to}\n${info.response}`);
            }
          });
      });
  }

  public transporter: nodemailer.Transporter;

  constructor(host, port, user, pass) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      requireTLS: true,
      auth: {
        user,
        pass,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      }
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
