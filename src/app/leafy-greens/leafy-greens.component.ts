import { Component, OnInit } from '@angular/core';
import { addToCart, decrement, increment } from '../store/vegCart.action';
import { cartState, Products } from '../store/vegCart.state';
import { ProductServiceService } from '../product-service/product-service.service';
import { selectCartItems } from '../store/vegCrt.selector';
import { select, Store } from '@ngrx/store';
import { combineLatest, count, debounceTime, map, Observable } from 'rxjs';
import { SearchService } from '../search-service/search.service';
import { ActionService } from '../action-service/action.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leafy-greens',
  templateUrl: './leafy-greens.component.html',
  styleUrls: ['./leafy-greens.component.css'],
})
export class LeafyGreensComponent {
  cartItems$ : Observable<Products[]>;
  filteredProducts$ : Observable<Products[]>;
  category = 'Leafy'

  constructor(private store : Store, private productService: ProductServiceService, private searchService : SearchService, public action : ActionService){
    this.cartItems$ = this.store.select(selectCartItems)
    console.log('Current Category:', this.category);

    this.filteredProducts$ = combineLatest([
      this.searchService.searchText$.pipe(debounceTime(700)),
      this.productService.getAllProducts(),
      this.cartItems$,
      this.searchService.leafyCat$.pipe(debounceTime(700))
    ]).pipe(
      map(([searchedText, allProducts, cartItems, specialCategory]) => {
        const SearchText = searchedText.trim().toLowerCase();
        const SpecialCategory = specialCategory.trim().toLowerCase();
        const showAllProducts =  allProducts;
        const categoryProducts = allProducts.filter(
          (product) => product.category === this.category
        );

        let productsToFilter = categoryProducts;

        if (SpecialCategory === 'leafy') { 
          productsToFilter = categoryProducts;
        } else if (SpecialCategory === 'traditional') {
          productsToFilter = categoryProducts.filter((product) =>
            product.splcat.toLowerCase().includes('traditional')
          );
        } else if (SpecialCategory === 'organic') {
          productsToFilter = categoryProducts.filter((product) =>
            product.splcat.toLowerCase().includes('organic')
          );
        } else if (SpecialCategory === 'fresh') {
          productsToFilter = categoryProducts.filter((product) =>
            product.splcat.toLowerCase().includes('fresh')
          );
        }  

        const searchedProducts = SearchText
          ? showAllProducts.filter((product) =>
              product.product_name.toLowerCase().includes(SearchText)
            )
          : productsToFilter;

        return searchedProducts.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          return cartItem
            ? { ...product, addedToCart: true, count: cartItem.count }
            : { ...product, addedToCart: false, count: 0 };
        });
      })
    );



  }
   notify() {
    Swal.fire("Thankyou", 'We will notify you when they are back in stock', "success")
  }
}

