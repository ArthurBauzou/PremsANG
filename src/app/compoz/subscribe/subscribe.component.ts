import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  subForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8)
    ]),
    password2: new FormControl(),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    avatar: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.subForm.value)
  }

}
