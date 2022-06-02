export class User {
    public username: string;
    public name: string;
    public avatar: string;
    public email: string;
    public roles: string[];

    constructor (
        username: string = "",
        name: string = "",
        avatar: string = "",
        email: string = "",
        roles: string[] = []
    ) {
        this.username = username;
        this.name = name;
        this.avatar = avatar;
        this.email = email;
        this.roles = roles;
    }
}
