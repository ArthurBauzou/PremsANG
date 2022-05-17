import { Component, OnInit } from '@angular/core';
import { ProdsService } from 'src/app/services/prods.service';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  price:number = 1;

  constructor(private prodServ: ProdsService) { }
  
  ngOnInit(): void {
  }

  addProd(produit:any) {
    console.log(produit.value)
    let data = produit.value
    this.prodServ.addProds(data).subscribe(data => {
      console.log("les données sont enregistrées")
    })
  }

}
