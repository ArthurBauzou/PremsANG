import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdsComponent } from './compoz/prods/prods.component';
import { HomeComponent } from './compoz/home/home.component';
import { AddProdComponent } from './compoz/add-prod/add-prod.component';
import { PanierComponent } from './compoz/panier/panier.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdsComponent,
    HomeComponent,
    AddProdComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
