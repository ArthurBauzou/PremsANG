import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { PanierService } from 'src/app/services/panier.service';
import { ProdsService } from 'src/app/services/prods.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-prods',
  templateUrl: './prods.component.html',
  styleUrls: ['./prods.component.css']
})
export class ProdsComponent implements OnInit {

  prods: any = [];
  prodasup: any = {};
  prodedit: any = {};
  user = new User('','','','','',[])

  filters:any = {
    "type": {
      "legume": false,
      "fruit": false,
      "autre": false
    },
    "prix": {
      "min": 0,
      "max": 0
    }
  };
  alerte: any = {};

  constructor(
    private _prodsService : ProdsService,
    private _panierService : PanierService,
    private _usersServ: UsersService
    ) {}

  ngOnInit(): void {
    this.getProducts(this.filters);
    this._usersServ.getCurrentUser().subscribe(
      (u) => this.user = u
    )
  }
  
  getProducts(param?:any){
    this._prodsService.getProds(param).subscribe({
      next: (d) => this.prods = d,
      error: (e) => console.log("err",e),
      complete: () => {for (let p of this.prods) {p.show = false}}
    });
  }

  delProduit(id:number){
    this._prodsService.delProd(id).subscribe({
      next: () => console.log(`L’objet avec id = ${id} a été supprimé`),
      error: (err) => console.log("erreur lors de la suppression", err),
      complete: () => { 
        this.getProducts(this.filters);
        this.prodasup.deleted = true;
      }
    });
  }

  editProd(id:number, prEd:any) {
    let newData = prEd.value;
    newData.dispo = this.prodedit.dispo;
    this._prodsService.updateProd(id, newData).subscribe({
      next: ()=> console.log('bien édité le produit '+newData.name+' avec id = '+id),
      error: (err) => console.log("erreur lors de l’édition", err),
      complete: () => { 
        this.getProducts(this.filters);
        this.prodedit.edited = true;
      }
    });
  }

  switchDispo(id:number, disp:boolean) {
    let data = {dispo: !disp}
    this._prodsService.patchProd(id, data).subscribe({
      next: ()=> console.log('la dispo est switchée'),
      error: (err)=> console.log('erreur dans le switch', err),
      complete: () => {
        this.getProducts(this.filters);
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

  getPriceRange(minmax:any) {
    this.filters.prix = minmax.value;
    this.getProducts(this.filters);
  }

  resetPriceForm() {
    this.filters.prix.min = 0;
    this.filters.prix.max = 0;
    this.getProducts(this.filters);
  }

  ajouterAuPanier(p:any) { this._panierService.ajouteAuPanier.emit(p) }

}
