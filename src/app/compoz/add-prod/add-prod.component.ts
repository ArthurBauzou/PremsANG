import { Component, OnInit } from '@angular/core';
import { ProdsService } from 'src/app/services/prods.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  price:number = 1;

  constructor(
    private prodServ: ProdsService,
    private router: Router,
    ) { }
  
  ngOnInit(): void {
  }

  addProd(produit:any) {
    let data = produit.value
    this.prodServ.addProd(data).subscribe({
      next: () => console.log("les données sont enregistrées"),
      error: (err) => console.log("il y a eu une erreur omg", err)
    });
    this.router.navigate(['produits']);
  }

}
