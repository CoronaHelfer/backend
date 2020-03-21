class Config {
  public PORT: string;
  public API_ROOT_PATH: string;
  public DB_URL: string;
  public JWT_TOKEN_SECRET: string;
  public configENV: object;

  constructor() {
    // this.configENV = process.env;
    this.PORT = '3000';
    this.API_ROOT_PATH = 'api';
    this.DB_URL = 'mongodb://127.0.0.1:27017/corona-helper';
    this.JWT_TOKEN_SECRET = '';
  }

}

export default Config;
