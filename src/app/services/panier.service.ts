import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  prodAjoute = new EventEmitter();

  constructor() { }

}
