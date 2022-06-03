import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  users: User[] = [];
  user = new User()

  // test messages
  messages: any[] = ["premier message"];

  constructor(
    private _usersServ: UsersService
  ) {
    this._usersServ.onMessage().subscribe((message) => {
      message == "clear" ? this.messages = [] : this.messages.push(message)
    })
  }

  ngOnInit(): void {
    this.getUsers()
    this.getUser()
    this._usersServ.refreshUser.subscribe(()=>this.getUser())
  }
  
  getUsers() {
    this._usersServ.getAllUsers().subscribe({
      next: (u:any)=> this.users = u,
      error: (err)=> console.log(err),
      complete: ()=> {}
    })
  }
  getUser() {
    this._usersServ.getCurrentUser().subscribe(
      (u) => this.user = u
    )
  }


}
