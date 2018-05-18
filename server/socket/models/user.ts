import { isRealHost } from '../utils/validation'
import { Socket } from 'socket.io';
export class User {
    protected id:string
    public socket: Socket
    private isHost:boolean = false
    constructor(id: string, socket:Socket) {
        this.id = id
        this.socket = socket
    }

    public getID():string {
        return this.id
    }
}