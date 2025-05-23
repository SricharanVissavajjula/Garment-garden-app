import { Component, OnInit } from '@angular/core';
import { cartState, Products } from '../store/vegCart.state';
import { combineLatest, debounceTime, map, Observable } from 'rxjs';
import { ProductServiceService } from '../product-service/product-service.service';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../store/vegCrt.selector';
import { addToCart, decrement, increment } from '../store/vegCart.action';
import { SearchService } from '../search-service/search.service';
import { ActionService } from '../action-service/action.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spices',
  templateUrl: './spices.component.html',
  styleUrls: ['./spices.component.css'],
})
export class SpicesComponent{

  cartItems$ : Observable<Products[]>;
  filteredProducts$  : Observable<Products[]>;
  category = 'Spices';

  constructor(private store  : Store, private productService : ProductServiceService, private searchService : SearchService, public action  : ActionService){
    this.cartItems$ = this.store.select(selectCartItems)

    this.filteredProducts$ = combineLatest([
      this.searchService.searchText$.pipe(debounceTime(700)),
      this.searchService.spiceCat$.pipe(debounceTime(700)),
      this.productService.getAllProducts(),
      this.cartItems$,
      ]).pipe(
        map(([searchedText, SpecialCat, allProducts, cartItems]) => {
          const searchText = searchedText.trim().toLowerCase();
          const productCategory = allProducts.filter((product)=> 
          product.category === this.category);
          const showAllProducts =  allProducts;
          const SpecialCategory = SpecialCat.trim().toLowerCase();


          let productsToFilter = productCategory

          if (SpecialCategory === 'spices') {
            productsToFilter = productCategory;
          } else if (SpecialCategory === 'traditional') {
            productsToFilter = productCategory.filter((product) =>
              product.splcat.toLowerCase().includes('traditional')
            );
          } else if (SpecialCategory === 'organic') {
            productsToFilter = productCategory.filter((product) =>
              product.splcat.toLowerCase().includes('organic')
            );
          } else if (SpecialCategory === 'fresh') {
            productsToFilter = productCategory.filter((product) =>
              product.splcat.toLowerCase().includes('fresh')
            );
          }  

          const searchedProducts = searchText
          ? showAllProducts.filter((prod) => 
          prod.product_name.toLowerCase().includes(searchText))
          : productsToFilter

          return searchedProducts.map((prod)=> {
            const cartItem = cartItems.find(item => item.id === prod.id)
            return cartItem 
            ? {...prod, addedToCart : true, count : cartItem.count}
            : {...prod, addedToCart : false, count : 0}
          })
    })
      )
  }
   notify() {
    Swal.fire("Thankyou", 'We will notify you when they are back in stock', "success")
  }

  
}
