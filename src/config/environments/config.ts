class Config {
  public PORT: string;
  public API_ROOT_PATH: string;
  public DB_URL: string;
  public JWT_TOKEN_SECRET: string;
  public configENV: object;
  private JWT_EXPIRE_TIME: number;
  public googleApiKey: string;

  constructor() {
    // this.configENV = process.env;
    this.PORT = '3000';
    this.API_ROOT_PATH = 'api';
    this.DB_URL = 'mongodb://corona-helper:wirvsvirus2020@134.255.225.148:27072/coronaHelper?authSource=admin&readPreference=primary';
    this.JWT_TOKEN_SECRET = '';
    this.JWT_EXPIRE_TIME = 86400; // 1 week
    this.googleApiKey = ""
  }
}

export default Config;
