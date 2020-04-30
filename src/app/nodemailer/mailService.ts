import * as nodemailer from 'nodemailer';

/**
 * Environment Configuration
 * host
 * port
 * auth_user
 * auth_pass
 * from_name
 * from_address
 */

export class MailService {

  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // todo config
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'verification@coronahelfer.eu', // todo config
        pass: '%rGPHPB6RtCG9oHunAeN', // todo config
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
        name: 'Corona Helfer', // todo config
        address: 'verification@coronahelfer.eu', // todo config
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
