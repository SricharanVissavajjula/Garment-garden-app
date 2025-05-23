import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreshVegComponent } from './fresh-veg/fresh-veg.component';
import { FreshFruitsComponent } from './fresh-fruits/fresh-fruits.component';
import { LeafyGreensComponent } from './leafy-greens/leafy-greens.component';
import { GrainsComponent } from './grains/grains.component';
import { SpicesComponent } from './spices/spices.component';
import { CartpageComponent } from './cartpage/cartpage.component';

const routes: Routes = [
  {
    path : 'Vegetables',
    component: FreshVegComponent,
    title : "Fresh Vegetables"
  },
  {
    path : 'fruits',
    component: FreshFruitsComponent,
    title : "Fruits"
  },{
    path: 'Leafy',
    component: LeafyGreensComponent,
    title : "Leafy Greens"
  }
  ,{
    path : 'grains',
    component: GrainsComponent,
    title : "Grains"
  },
  {
    path : 'spices',
    component : SpicesComponent,
    title : "Spices"
  },{
    path : 'cartpage',
    component: CartpageComponent,
    title : "Cart Page",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
