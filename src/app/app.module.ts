import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdsComponent } from './compoz/prods/prods.component';
import { HomeComponent } from './compoz/home/home.component';
import { AddProdComponent } from './compoz/add-prod/add-prod.component';
import { PanierComponent } from './compoz/panier/panier.component';
import { UserComponent } from './compoz/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdsComponent,
    HomeComponent,
    AddProdComponent,
    PanierComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
