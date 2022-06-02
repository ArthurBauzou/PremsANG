import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

export class PanierComponent implements OnInit {

  panier = new Map;
  // panierVisible: boolean = false;
  panierTotal: number = 0;
  nameProduct: any;
  @ViewChild('panierWin') panierwin!: ElementRef

  constructor( private _panierServ: PanierService ) {}

  ngOnInit(): void {
    this._panierServ.ajouteAuPanier.subscribe(
      (p) => {
        this.ajouterProdPanier(p)
        this.panierwin.nativeElement.classList.remove('hidd')
      },
      (err) => console.log(err)
    )
  }

  ajouterProdPanier (p:any) {
    if (!this.panier.get(p.id)) {
      this.panier.set(p.id, {
        "name": p.name,
        "price": p.price,
        "nb": 1
      })
    } else {
      this.panier.get(p.id).nb += 1
    }
  }

  editPanier(id:number, ope:string) {
    if (ope == "ajoute") {
      this.panier.get(id).nb += 1
    }
    else if (ope == "retire") {
      this.panier.get(id).nb -= 1
      if (this.panier.get(id).nb == 0) {
        this.panier.delete(id)
      }
    }
  }

  calcTot(): string {
    this.panierTotal = 0
    this.panier.forEach((e:any) => {
      this.panierTotal += e.price * e.nb
    });
    return String(this.panierTotal.toFixed(2)).replace('.', ',')
  }

}
