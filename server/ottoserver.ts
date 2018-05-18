import ExpressServer from './common/server';
import SocketServer from './socket/socketServer'
import routes from './routes';

export class OttoServer {
    private expressServer: ExpressServer;
    private socketServer: SocketServer;
    private app: Express.Application
    constructor(port: number){
        this.expressServer = new ExpressServer()
        this.expressServer.router(routes);
        this.app = this.expressServer.listen(port);
        this.socketServer = new SocketServer(this.expressServer.getServer());
    }

    public getApp(): Express.Application{
       return this.app;
    }

}