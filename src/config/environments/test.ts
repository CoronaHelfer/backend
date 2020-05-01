import Config from './config';

class Test extends Config {
  constructor() {
    super();
    this.PORT = '3001';
  }

  public testConfig() {
    return this;
  }
}

export default new Test().testConfig();
