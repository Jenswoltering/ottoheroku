import { isRealHost } from '../utils/validation'
import { User } from './user'
import { Host } from './host'
import { Room } from './room'
import * as socketIo from 'socket.io';

export class RoomManager {
    private rooms: Room[]
    constructor() {
        this.rooms = []
    }

    public addRoom(roomID: string, host:Host){
        let room = new Room( roomID )
        if (this.isExisting(roomID) == false){
            room.addHost(host);
            this.rooms.push(room);
            host.socket.join(roomID);
        }else{
            this.getRoom(roomID).addHost(host)
        }
    }

    public joinUser(roomID: string, user: User): void {
        if (this.isExisting(roomID) == false){
            this.logoutOtherRooms(roomID,user)
            let room = this.getRoom(roomID)
            room.addUser(user)
            user.socket.join(roomID);
            user.socket.to(room.getHost().getID()).emit('newUser');
        }
    }

    public logoutOtherRooms(exceptRoomID: string, user:User):void{
        this.rooms.forEach(room => {
            if (room.hasUser(user)){
                if (room.getID() != exceptRoomID){
                    user.socket.to(room.getHost().getID()).emit('ciao');
                    user.socket.leave(exceptRoomID)
                    room.deleteUser(user);
                }
            }
        });

    }

    public isExisting(roomID :string):boolean{
        return this.rooms.some(room => room.getID() == roomID);
    }

    public getRoom(roomID: string):Room{
        return this.rooms.find(room => room.getID() == roomID)
    }

    public deleteRoom(roomID: string){
        let index = this.rooms.indexOf(this.getRoom(roomID), 0);
        if (index > -1) {
            this.rooms.splice(index, 1);
        }
    }

    public getHostOfRoom(roomID :string) :Host{
        let room = this.getRoom(roomID)
        return room.getHost()
    }
}