import { Socket } from 'socket.io';
import { isRealHost } from '../utils/validation'
export class User {
    public socket: Socket
    protected id:string
    private isHost:boolean = false
    constructor(id: string, socket:Socket) {
        this.id = id
        this.socket = socket
    }

    public getID():string {
        return this.id
    }
}