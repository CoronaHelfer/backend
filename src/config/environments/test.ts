import Config from './config';

class Test extends Config {
  constructor() {
    super();
    this.JWT_TOKEN_SECRET = 'RESTFULAPIs';
    this.PORT = '3001';
  }

  public testConfig() {
    return this;
  }
}

export default new Test().testConfig();
