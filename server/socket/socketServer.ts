import { Server } from 'http';
import * as socketio from 'socket.io';
import l from '../common/logger';
import { Host, Room, RoomManager ,User } from './models';
import {isRealHost, isRealString} from './utils/validation';
export default class SocketServer {
    private io: SocketIO.Server;
    private roomManager: RoomManager

    constructor(server: Server){
        this.roomManager = new RoomManager();
        this.io = socketio(server);
        this.listen();
    }

    private listen():void {
        this.io.on('connect', (socket: SocketIO.Socket) => {
            l.info(`'Connection sucessfull ' + socket.id.toString()`);
            socket.on('create', (roomID: string) => {
                if( isRealHost(socket.id)){
                    l.info("host add request room: " + roomID)
                    const host = new Host(socket.id , socket);
                    this.roomManager.addRoom(roomID,host);
                }
                // console.log('[server](message): %s', JSON.stringify(roomID) + socket.id);
            });

            socket.on('join', (roomID: string) => {
                if (this.roomManager.isExisting(roomID)){
                    const user = new User( socket.id ,socket )
                    this.roomManager.joinUser(roomID, user)
                    socket.to(this.roomManager.getHostOfRoom(roomID).getID()).emit('newUser', user.getID())
                    // console.log(this.roomManager.getRoom(roomID).getHost().getID())
                }
                // console.log('[server](message): %s', JSON.stringify(roomID));
            });

            socket.on('jsm', (roomID: string, joystickData: any) => {
                l.info("Got jsm for room: " +  roomID)
                if (this.roomManager.isExisting(roomID)){
                    l.info("Got jsm")
                    // console.log(this.roomManager.getHostOfRoom(roomID).getID() + '' + JSON.stringify(joystickData))
                socket.to(this.roomManager.getHostOfRoom(roomID).getID()).emit('jsm',joystickData)
                }else{
                    l.info("Got jsm but no host")
                }

                // this.io.in('123').emit('hello', '8999,929; -179,3');
                
                // console.log('[server](message): %s', JSON.stringify(m));
            });
            socket.on('jss', (roomID: string) => {
                if (this.roomManager.isExisting(roomID)){
                    socket.to(this.roomManager.getHostOfRoom(roomID).getID()).emit('jss')
                }
            });
            socket.on('forceDisconnect', () => {
                socket.disconnect();
                // console.log(Object.keys(this.io.sockets.sockets));
            });

            socket.on('disconnect', () => {
                       // console.log('Client disconnected');
            });
        });
    }
}