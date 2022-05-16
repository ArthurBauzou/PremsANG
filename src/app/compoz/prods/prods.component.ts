import { Component, OnInit } from '@angular/core';
import { ProdsService } from 'src/app/services/prods.service';

@Component({
  selector: 'app-prods',
  templateUrl: './prods.component.html',
  styleUrls: ['./prods.component.css']
})
export class ProdsComponent implements OnInit {

  prods:any;

  constructor(private PrServ : ProdsService ) { }

  ngOnInit(): void {
    this.products()
  }
  
  products(){
    this.PrServ.getProds().subscribe(d=>{
      this.prods = d;
      console.log(this.prods)
    })
  }
}
