class Config {
  public PORT: string;
  public API_ROOT_PATH: string;
  public DB_URL: string;
  public JWT_TOKEN_SECRECT: string;
  public configENV: object;

  constructor() {
    // this.configENV = process.env;
    this.PORT = '3000';
    this.API_ROOT_PATH = 'api';
    this.DB_URL = 'mongodb://mongo:27017/node-babel';
    this.JWT_TOKEN_SECRECT = '';
  }

}

export default Config;
