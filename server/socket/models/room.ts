import { isRealHost } from '../utils/validation'
import { User } from './user'
import { Host } from './host'

export class Room {
    private host: Host
    private users: User[]
    private id: string
    constructor(id: string,) {
        this.id = id
        this.host = null
        this.users = []
    }

    public addHost(host: Host):void {
        this.host = host
    }
    public addUser(user: User):void {
        this.users.push(user)
    }
    public deleteUser(user: User):void{
        let index = this.users.indexOf(user, 0);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }
    public hasUser(user:User):boolean {
        return this.users.some(user => user == user)
    }
    public hasHost():boolean{
        if  (this.host != null) {
            return true
        }else{
            return false
        }
    }
    public getHost():Host{
        return this.host;
    }
    public getID():string {
        return this.id
    }

}