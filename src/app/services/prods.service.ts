import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProdsService {

  constructor(private http : HttpClient) { }

  getProds(typeFilter?: any) {
    let params: string = ""
    if (typeFilter) { params += "?" }
    // filtres de type
    for (const type in typeFilter) {
      if (typeFilter[type]==true) {params += `type=${type}&`}
    }

    return this.http.get("http://localhost:3000/produits"+params)
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


