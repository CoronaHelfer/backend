import Config from './config';

class Development extends Config {
  constructor() {
    super();
    this.DB_COLLECTION = 'coronahelfer-dev';
  }

  public devConfig() {
    return this;
  }
}

export default new Development().devConfig();
