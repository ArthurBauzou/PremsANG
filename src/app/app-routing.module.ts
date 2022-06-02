import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdsComponent } from './compoz/prods/prods.component';
import { HomeComponent } from './compoz/home/home.component';
import { AddProdComponent } from './compoz/add-prod/add-prod.component';
import { SubscribeComponent } from './compoz/subscribe/subscribe.component';

const routes: Routes = [
  { path: 'produits', component: ProdsComponent, data:{} },
  { path: '', component: HomeComponent },
  { path: 'ajouter-un-produit', component: AddProdComponent},
  { path: 'inscription', component: SubscribeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
