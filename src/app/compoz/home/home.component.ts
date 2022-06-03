import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  users: User[] = [];
  user = new User()
  userAbo: Subscription;

  // test messages
  messages: any[] = ["premier message"];

  constructor(
    private _usersServ: UsersService
  ) { 
    this.userAbo = this._usersServ.userChange().subscribe((u)=>this.user=u)
   }

  ngOnInit(): void {
    this.getUsers()
  }
  
  getUsers() {
    this._usersServ.getAllUsers().subscribe({
      next: (u:any)=> this.users = u,
      error: (err)=> console.log(err),
      complete: ()=> {}
    })
  }

}
