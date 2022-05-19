import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProdsService {

  constructor(private http : HttpClient) { }

  getProds() {
    return this.http.get("http://localhost:3000/produits")
  }

  addProd(produit:any) {
    return this.http.post("http://localhost:3000/produits", produit)
  }

  delProd(id:number) {
    return this.http.delete("http://localhost:3000/produits/"+id)
  }

  updateProd(id:number, prod:any) {
    return this.http.put("http://localhost:3000/produits/"+id, prod)
  }

  patchProd(id:number, property:any) {
    return this.http.patch("http://localhost:3000/produits/"+id, property)
  }
}


