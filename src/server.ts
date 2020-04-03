import Express from 'express';
import DBConnection from './config/db/connection';
import initCategories from './config/db/initCategories';
import Environment from './config/environments';
import ExpressMiddleware from './config/express-middleware';

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public static bootstrap(): Server {
    return new Server();
  }

  public app: Express.Application;
  protected config: any;

  constructor() {
    this.app = Express();
    this.dbConfig();
    this.config = Environment;
    ExpressMiddleware.init(this.app, this.config);
    this.main();
  }

  public main() {
    const port = this.config.PORT;
    this.app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  }

  private dbConfig() {
    const db = new DBConnection();
    initCategories.start();
  }
}

const server = Server.bootstrap();
// server.main();
export = server.app;
