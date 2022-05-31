import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProdsComponent } from './compoz/prods/prods.component';
import { HomeComponent } from './compoz/home/home.component';
import  { AddProdComponent } from './compoz/add-prod/add-prod.component'

const routes: Routes = [
  // { path: '', component: AppComponent, },
  { path: 'produits', component: ProdsComponent },
  { path: '', component: HomeComponent },
  { path: 'ajouter-un-produit', component: AddProdComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
