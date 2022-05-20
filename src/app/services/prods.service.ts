import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProdsService {

  constructor(private http : HttpClient) { }

  getProds(filters: any) {
    let params: string = "?"
    for (const type in filters.type) {
      if (filters.type[type]==true) {params += `type=${type}&`}
    }
    if (filters.prix.min!=0) {params += `price_gte=${filters.prix.min}&`}
    if (filters.prix.max!=0) {params += `price_lte=${filters.prix.max}&`}
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


