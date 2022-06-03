import { Component, OnInit } from '@angular/core';
import { ProdsService } from 'src/app/services/prods.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})

export class AddProdComponent implements OnInit {

  price:number = 1;
  user = new User;
  userAbo: Subscription;

  constructor(
    private prodServ: ProdsService,
    private _router: Router,
    private _usersServ: UsersService
  ) { 
    this.userAbo = this._usersServ.userChange().subscribe((u)=>this.user=u)
  }
  
  ngOnInit(): void {
  }

  addProd(produit:any) {
    let data = produit.value
    data.dispo = true
    this.prodServ.addProd(data).subscribe({
      next: () => console.log("les données sont enregistrées"),
      error: (err) => console.log("il y a eu une erreur omg", err),
      complete: () => {
        this._router.navigate(['produits']);
      }
    });
  }

}
