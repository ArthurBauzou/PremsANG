import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProdsComponent } from './compoz/prods/prods.component';
import { HomeComponent } from './compoz/home/home.component';

const routes: Routes = [
  // { path: '', component: AppComponent, },
  { path: 'produits', component: ProdsComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
