import Express from 'express';
import DBConnection from './config/db/connection';
import Environment from './config/environments';
import ExpressMiddleware from './config/express-middleware';

class Server {

  public static bootstrap(): Server {
    return new Server();
  }

  public app: Express.Application;
  protected config: any;
  private db;

  constructor() {
    this.app = Express();
    this.db = new DBConnection();
    this.config = Environment;
    ExpressMiddleware.init(this.app, this.config);
    this.main();
  }

  public main() {
    const port = this.config.PORT;
    this.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  }
}

const server = Server.bootstrap();
export = server.app;
