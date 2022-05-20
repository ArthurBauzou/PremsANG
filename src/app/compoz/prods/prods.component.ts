import { Component, OnInit } from '@angular/core';
import { ProdsService } from 'src/app/services/prods.service';

@Component({
  selector: 'app-prods',
  templateUrl: './prods.component.html',
  styleUrls: ['./prods.component.css']
})
export class ProdsComponent implements OnInit {

  prods: any;
  prodasup: any = {};
  prodedit: any = {};
  typeFilter:any = {
    "legume": true,
    "fruit": true,
    "autre": true
  };

  constructor(
    private prServ : ProdsService
    ) { }

  ngOnInit(): void {
    this.getProducts(this.typeFilter);
  }
  
  getProducts(param?:any){
    this.prServ.getProds(param).subscribe({
      next: (d) => this.prods = d,
      error: (e) => console.log("err",e),
      complete: () => {for (let p of this.prods) {p.show = false}}
    });
  }

  toggleTypeFilter(type:string) {
    if (this.typeFilter.includes(type)) {this.typeFilter}
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
    let newData = prEd.value;
    newData.dispo = this.prodedit.dispo;
    this.prServ.updateProd(id, newData).subscribe({
      next: ()=> console.log('bien édité le produit '+newData.name+' avec id = '+id),
      error: (err) => console.log("erreur lors de l’édition", err),
      complete: () => { 
        this.getProducts();
        this.prodedit.edited = true;
      }
    });
  }

  switchDispo(id:number, disp:boolean) {
    let data = {dispo: !disp}
    this.prServ.patchProd(id, data).subscribe({
      next: ()=> console.log('la dispo est switchée'),
      error: (err)=> console.log('erreur dans le switch', err),
      complete: () => {
        this.getProducts();
      }
    });
  }

  loadProdEdit(p:any) {
    this.prodedit.image = p.image;
    this.prodedit.id = p.id;
    this.prodedit.name = p.name;
    this.prodedit.descr = p.descr;
    this.prodedit.type = p.type;
    this.prodedit.dispo = p.dispo;
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
