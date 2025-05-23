import { Injectable } from '@angular/core';
import { Products } from '../store/vegCart.state';
import { addToCart, decrement, increment } from '../store/vegCart.action';
import { Store } from '@ngrx/store';
import { ProductServiceService } from '../product-service/product-service.service';
import { debounceTime, timeout } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private store : Store, private productService : ProductServiceService, private toster : ToastrService ) { }

  addToCart(product: Products) {
    this.store.dispatch(addToCart({ product }));
    this.toster.success(`${product.product_name} added`,  '', {
      timeOut: 700
    })
  }

  incrementBtn(product: Products) {
    this.store.dispatch(increment({ productId: product.id }));
    this.toster.success(`${product.product_name} added`, '',{
      timeOut: 700
    })
  }

  decrementBtn(product: Products) {
    this.store.dispatch(decrement({ productId: product.id }));
    
  }
}
