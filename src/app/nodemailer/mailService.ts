import * as nodemailer from 'nodemailer';

const removeIndentation = (template) => {
  return template.trim().replace(/(\n\n?)(\s+)/g, '$1');
};

export class MailService {

  public static async sendVerificationMail(
    to: string,
    key: string,
    transporter: nodemailer.Transporter,
    address: string,
    name: string,
    refererHost: string,
  ): Promise<void> {
    const subject = 'Corona-Helfer E-Mail Verification';

    const content = removeIndentation(`
      Hallo,

      Bitte klick auf folgenden Link um deinen Account zu bestätigen: ${refererHost}verify?key=${key}

      Mit freundlichen Grüßen,
      Dein coronahelfer.eu Team
    `);

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
    let options;

    if (process.env.LOCAL_ENV) {
      options = {
        host: '127.0.0.1',
        port: 5025,
        ignoreTLS: true,
      };
    } else {
      options = {
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
      };
    }

    this.transporter = nodemailer.createTransport(options);

    this.transporter.verify((error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}
