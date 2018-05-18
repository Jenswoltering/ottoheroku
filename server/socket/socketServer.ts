import * as socketio from 'socket.io';
import { Server } from 'http';
import { Room, User, Host ,RoomManager } from './models';
import {isRealString, isRealHost} from './utils/validation';
import l from '../common/logger';
export default class SocketServer {
    private io: SocketIO.Server;
    private roomManager: RoomManager

    constructor(server: Server){
        this.roomManager = new RoomManager
        this.io = socketio(server);
        this.listen();
    }

    private listen():void {
        this.io.on('connect', (socket: SocketIO.Socket) => {
            socket.emit("hallo");
            console.log('Connected client on port %s.');
            l.info(`socket connected`);
            socket.on('create', (roomID: string) => {
                if( isRealHost(socket.id)){
                    let host = new Host( socket.id ,socket )
                    this.roomManager.addRoom(roomID,host)
                }
                console.log('[server](message): %s', JSON.stringify(roomID) + socket.id);
            });

            socket.on('join', (roomID: string) => {
                if (this.roomManager.isExisting(roomID)){
                    let user = new User( socket.id ,socket )
                    this.roomManager.joinUser(roomID, user)
                    socket.to(this.roomManager.getHostOfRoom(roomID).getID()).emit('newUser')
                    console.log(this.roomManager.getRoom(roomID).getHost().getID())
                }
                //console.log('[server](message): %s', JSON.stringify(roomID));
            });

            socket.on('jsm', (roomID: string, joystickData: any) => {
                if (this.roomManager.isExisting(roomID)){
                    console.log(this.roomManager.getHostOfRoom(roomID).getID() + '' + JSON.stringify(joystickData))
                socket.to(this.roomManager.getHostOfRoom(roomID).getID()).emit('jsm',joystickData)
                }
                //this.io.in('123').emit('hello', '8999,929; -179,3');
                
                //console.log('[server](message): %s', JSON.stringify(m));
            });
            socket.on('jss', (roomID: string) => {
                if (this.roomManager.isExisting(roomID)){
                    socket.to(this.roomManager.getHostOfRoom(roomID).getID()).emit('jss')
                }
            });
            socket.on('forceDisconnect', () => {
                socket.disconnect();
                console.log(Object.keys(this.io.sockets.sockets));
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}