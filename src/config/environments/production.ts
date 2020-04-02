import Config from './config';

class Production extends Config {
    constructor() {
        super();
        this.DB_USERNAME = '!!!DO NOT COMMIT THIS LINE!!!';
        this.DB_PASSWORD = '!!!DO NOT COMMIT THIS LINE!!!';
        this.DB_COLLECTION = 'coronahelfer';
        this.DB_PORT = 32470;
        this.DB_URL = 'ce9f6d8d-e3b1-4c04-9481-fbef09eb3941-0.bpb68u2f0gvaqgd0n64g.databases.appdomain.cloud';
    }

    public prodConfig() {
        return this;
    }
}

export default new Production().prodConfig();
