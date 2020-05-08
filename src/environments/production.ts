import Config from './config';

class Production extends Config {
  constructor() {
    super();
    this.DB_NAME = 'coronahelfer';
  }

  public prodConfig() {
    return this;
  }
}

export default new Production().prodConfig();
