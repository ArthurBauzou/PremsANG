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

  constructor(
    private _usersServ: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this._usersServ.getCurrentUser().subscribe(
      (u) => this.user = u
    )
  }
  
  getUsers() {
    this._usersServ.getAllUsers().subscribe({
      next: (u:any)=> this.users = u,
      error: (err)=> console.log(err),
      complete: ()=> {}
    })
  }

}
