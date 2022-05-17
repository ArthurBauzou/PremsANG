import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProdsService {
  constructor(private http : HttpClient) { }
  getProds() {
    return this.http.get("http://localhost:3000/produits")
  }
}
