import * as nodemailer from 'nodemailer';
import { MailService } from '../../app/nodemailer/mailService';

class Config {
  protected JWT_SECRET: string;
  protected DB_NAME: string;
  protected PORT: string;
  protected FIREBASE_PROJECT_ID: string;
  protected FIREBASE_CLIENT_EMAIL: string;
  protected FIREBASE_PRIVATE_KEY: string;
  protected FIREBASE_DATABASE_URL: string;

  private GOOGLE_API_KEY: string;
  private MAIL_HOST: string;
  private MAIL_PORT: number;
  private MAIL_AUTH_USER: string;
  private MAIL_AUTH_PASSWORD: string;
  private MAIL_ADDRESS: string;
  private MAIL_ADDRESS_NAME: string;
  private MAIL_TRANSPORTER: nodemailer.Transporter;

  constructor() {
    this.PORT = '3000';
    this.DB_NAME = 'local';

    this.JWT_SECRET = process.env.JWT_SECRET;
    this.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    this.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
    this.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
    this.FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
    this.FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL;

    this.MAIL_HOST = process.env.MAIL_HOST;
    this.MAIL_PORT = Number(process.env.MAIL_PORT);
    this.MAIL_AUTH_USER = process.env.MAIL_AUTH_USER;
    this.MAIL_AUTH_PASSWORD = process.env.MAIL_AUTH_PASSWORD;
    this.MAIL_ADDRESS = process.env.MAIL_ADDRESS;
    this.MAIL_ADDRESS_NAME = process.env.MAIL_ADDRESS_NAME;

    const mail = new MailService(
      this.MAIL_HOST,
      this.MAIL_PORT,
      this.MAIL_AUTH_USER,
      this.MAIL_AUTH_PASSWORD,
    );

    this.MAIL_TRANSPORTER = mail.transporter;
  }
}

export default Config;
