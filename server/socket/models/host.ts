import { isRealHost } from '../utils/validation'
import { User } from './user'
import { Socket } from 'socket.io';
export class Host extends User {
    constructor( id: string , socket: Socket) {
        super(id, socket)
    }
}