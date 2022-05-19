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
  prodedit: any = {};

  constructor(
    private prServ : ProdsService
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
      next: () => console.log(`L’objet avec id = ${id} a été supprimé`),
      error: (err) => console.log("erreur lors de la suppression", err),
      complete: () => { 
        this.getProducts();
        this.prodasup.deleted = true;
      }
    });
  }

  editProd(id:number, prEd:any) {
    console.log(prEd.value);
    this.prServ.updateProd(id, prEd.value).subscribe({
      next: ()=> console.log('bien édité le produit '+prEd.value.name+' avec id = '+prEd.value.id),
      error: (err) => console.log("erreur lors de l’édition", err),
      complete: () => { 
        this.getProducts();
        this.prodedit.edited = true;
      }
    })
  }

  loadProdEdit(p:any) {
    this.prodedit.image = p.image;
    this.prodedit.name = p.name;
    this.prodedit.descr = p.descr;
    this.prodedit.type = p.type;
    this.prodedit.id = p.id;
    this.prodedit.price = p.price;
    this.prodedit.imageShow = false;
    this.prodedit.edited = false;
  }

  loadProdASupp(p:any) {
    this.prodasup.name = p.name;
    this.prodasup.id = p.id;
    this.prodasup.deleted = false;
  }

}
