export class User {
    public name: string;
    public password: string;
    public avatar: string;
    public email: string;
    public roles: string[];

    constructor (name: string,password: string, avatar: string, email: string, roles: string[]) {
        this.name = name;
        this.password = password;
        this.avatar = avatar;
        this.email = email;
        this.roles = roles;
    }
}
