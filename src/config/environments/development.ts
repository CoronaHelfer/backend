import Config from './config';

class Development extends Config {
  constructor() {
    super();
    this.DB_COLLECTION = 'coronahelfer-dev-lange';
  }

  public devConfig() {
    return this;
  }
}

export default new Development().devConfig();
