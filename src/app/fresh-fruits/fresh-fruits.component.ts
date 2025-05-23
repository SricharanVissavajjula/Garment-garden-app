import { Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { cartState, Products } from '../store/vegCart.state';
import { selectCartItems } from '../store/vegCrt.selector';
import { ProductServiceService } from '../product-service/product-service.service';
import { SearchService } from '../search-service/search.service';
import { debounceTime, map, tap } from 'rxjs/operators';
import { ActionService } from '../action-service/action.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fresh-veg',
  templateUrl: './fresh-fruits.component.html',
  styleUrls: ['./fresh-fruits.component.css'],
})


export class FreshFruitsComponent {
  cartItems$: Observable<Products[]>;
  filteredProducts$: Observable<Products[]>;
  category: string = 'Fruits';

  constructor(
    private productService: ProductServiceService,
    private searchService: SearchService,
    private store: Store<{ cart: cartState }>,
    public action : ActionService
  ) {
    this.cartItems$ = this.store.pipe(select(selectCartItems));

    this.filteredProducts$ = combineLatest([
      this.searchService.searchText$.pipe(debounceTime(700)),
      this.productService.getAllProducts(),
      this.cartItems$,
      this.searchService.fruitCat$.pipe(debounceTime(700))
    ]).pipe(
      map(([searchedText, allProducts, cartItems, specialCategory]) => {
        const SearchText = searchedText.trim().toLowerCase();
        const SpecialCategory = specialCategory.trim().toLowerCase();
        const showAllProducts = allProducts
        const categoryProducts = allProducts.filter(
          (product) => product.category === this.category
        );

        let productsToFilter = categoryProducts;

        if (SpecialCategory === 'fresh vegetables') {
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
