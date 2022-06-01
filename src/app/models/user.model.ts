export class User {
    public username: string;
    public name: string;
    public password: string;
    public avatar: string;
    public email: string;
    public roles: string[];

    constructor (username: string, name: string,password: string, avatar: string, email: string, roles: string[]) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.avatar = avatar;
        this.email = email;
        this.roles = roles;
    }
}
