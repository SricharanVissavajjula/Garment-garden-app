import { Injectable } from '@angular/core';
import { Products } from '../store/vegCart.state';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  productCart : Products[] = []

  url = "http://localhost:3000/product-info";
  constructor() { }

  async getAllProducts() : Promise<Products[]> {
      const data = await fetch(this.url)
      return await data.json() ?? [];
  }

 
}
