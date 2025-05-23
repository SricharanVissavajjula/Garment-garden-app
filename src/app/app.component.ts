import { Component, inject, OnInit } from '@angular/core';
import { ProductServiceService } from './product-service/product-service.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { cartState, Products } from './store/vegCart.state';
import { Store, select } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from './search-service/search.service';
import { filter, flatMap, map, Observable, take } from 'rxjs';
import { selectCartItems } from './store/vegCrt.selector';
import { ActionService } from './action-service/action.service';
import { removeFromCart } from './store/vegCart.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'final-task';
  productCount: any;
  searchProduct: Products[] = [];
  cartItems$: Observable<Products[]>;
  totalAmount: number = 0;
  FinalAmount: number = 0;
  savedAmount: number = 0;
  isCartVisible: boolean = false;
  isLoginVisible: boolean = false;
  selectedCategory: string | undefined;

  constructor(
    private store: Store,
    private searchService: SearchService,
    public actions: ActionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
  }

  ngOnInit(): void {
    this.store.dispatch({ type: 'StoreInLocal' });
    this.cartItems$.subscribe((items) => {
      this.totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
      this.FinalAmount = this.totalAmount * (1 - 10 / 100);
      this.savedAmount = this.totalAmount - this.FinalAmount;
    });

    const mobileNavToggle = document.querySelector('.mobile-nav');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle && navLinks) {
      mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
    }
  }

  searchbyName(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.searchService.setSearchText(event.target.value);
    }
  }

    onCategoryChangeForVeg(selectedValue: string){
    this.selectedCategory = selectedValue;
    this.searchService.setVegCat(this.selectedCategory)
    console.log('Selected value fruit:', this.selectedCategory);
  }

  onCategoryChangeForFruits(selectedValue: string){
    this.selectedCategory = selectedValue;
    this.searchService.setFruitCat(this.selectedCategory)
    console.log('Selected value fruit:', this.selectedCategory);
  }

  onCategoryChangeForLeafy(selectedValue: string){
    this.selectedCategory = selectedValue;
    this.searchService.setLeafyCat(this.selectedCategory)
    console.log('Selected value:', this.selectedCategory);
  }

  onCategoryChangeForGrains(selectedValue: string){
    this.selectedCategory = selectedValue;
    this.searchService.setGrainsCat(this.selectedCategory)
    console.log('Selected value:', this.selectedCategory);
  }

  onCategoryChangeForSpices(selectedValue: string){
    this.selectedCategory = selectedValue;
    this.searchService.setSpicesCat(this.selectedCategory)
    console.log('Selected value:', this.selectedCategory);
  }

  openCartPopUp() {
    this.cartItems$
      .pipe(
        take(1),
        map((items) => items.length)
      )
      .subscribe((itemCount) => {
        if (itemCount === 0) {
          alert("You haven't added any products to show the cart");
        } else {
          this.isCartVisible = !this.isCartVisible;
        }
      });
  }

  openLoginPopUp() {
    this.isLoginVisible = !this.isLoginVisible;
  }
  closeLoginPopUp() {
    this.isLoginVisible = false;
    alert('logged in successfully');
  }

  closeCartPopUp() {
    this.isCartVisible = false;
  }

  loginSubmit() {
    this.isLoginVisible = false;
  }

  removeFromCart(id: number, name: string) {
    if (confirm(`are you sure you want to remove ${name} ?`)) {
      this.store.dispatch(removeFromCart({ productId: id }));
    }
  }
}

interface Food {
  value: string;
  viewValue: string;
}
