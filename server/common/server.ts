import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
// import { Application } from 'express';
import { createServer, Server } from 'http';
import * as os from 'os';
import * as path from 'path';
import l from './logger';
import swaggerify from './swagger';

const app = express();

export default class ExpressServer {
  private server: Server;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
  }

  public router(routes: (app: express.Application) => void): ExpressServer {
    swaggerify(app, routes)
    return this;
  }

  public listen(port: number = parseInt(process.env.PORT, 10)): express.Application {
    // tslint:disable-next-line:no-shadowed-variable
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} 
    @: ${os.hostname()} on port: ${port}}`);
    this.server = createServer(app).listen(port, welcome(port));
    return app;
  }

  public getServer(): Server {
    return this.server;
  }
}