import Config from './config';

class Development extends Config {
  constructor() {
    super();
    this.JWT_TOKEN_SECRET = 'RESTFULAPIs';
    this.DB_COLLECTION = 'coronahelfer-dev';
  }

  public devConfig() {
    return this;
  }
}

export default new Development().devConfig();
