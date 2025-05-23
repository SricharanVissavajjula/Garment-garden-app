import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Products } from '../store/vegCart.state';
import { selectCartItems } from '../store/vegCrt.selector';
import { decrement, increment, removeFromCart } from '../store/vegCart.action';
import { AppState } from '../app.state';
import { ActionService } from '../action-service/action.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent implements OnInit {
  cartItems$: Observable<Products[]>;
  totalAmount: number = 0;
  FinalAmount : number = 0
  savedAmount : number = 0

  constructor(private store: Store<AppState>, public actions :  ActionService, private route : Router) {
    this.cartItems$ = this.store.select(selectCartItems);
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      this.totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      );
      this.FinalAmount = this.totalAmount * (1 - (10/100))
      this.savedAmount = this.totalAmount - this.FinalAmount
    });
  }

  async checkedOut(){
    if(await Swal.fire("Thankyou", `Total amount paid - ₹${Math.round(this.FinalAmount)}.00`, "success")){
      this.route.navigate(['/Vegetables'])
    }
    else{
      alert('Thank you for shoping...!!!')
    }
  }


  async removeFromCart(id : number, name : string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `${name}'s has been deleted.`,
          icon: "success"
        });
        this.store.dispatch(removeFromCart({productId : id}))
      }
    });
  }
}
