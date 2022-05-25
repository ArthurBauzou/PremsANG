import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  ajouteAuPanier = new EventEmitter();

  constructor() { }

}
