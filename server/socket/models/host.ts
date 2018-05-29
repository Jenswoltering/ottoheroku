import { Socket } from 'socket.io';
import { isRealHost } from '../utils/validation'
import { User } from './user'
export class Host extends User {
    constructor( id: string , socket: Socket) {
        super(id, socket)
    }
}