import { Component, OnInit } from '@angular/core';
import { ProdsService } from 'src/app/services/prods.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-prods',
  templateUrl: './prods.component.html',
  styleUrls: ['./prods.component.css']
})
export class ProdsComponent implements OnInit {

  prods: any;
  prodasup: any = {};
  // prodedit: any;

  constructor(
    private prServ : ProdsService,
    // private router : Router
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    this.prServ.getProds().subscribe({
      next: (d) => this.prods = d,
      error: (e) => console.log("err",e),
      complete: () => {for (let p of this.prods) {p.show = false}}
    });
  }

  delProduit(id:number){
    this.prServ.delProd(id).subscribe({
      next:() => console.log(`L’objet avec id = ${id} a été supprimé`),
      error: (err) => console.log("erreur lors de la suppression", err),
      complete: () => { 
        this.getProducts();
        this.prodasup.deleted = true;
      }
    });
  }

}
