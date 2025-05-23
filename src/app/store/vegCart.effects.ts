// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { tap, withLatestFrom, map, catchError } from 'rxjs/operators';
// import { addToCart, removeFromCart, increment, decrement, loadCartSuccess, loadCartFailure } from './vegCart.action';
// import { Store, select } from '@ngrx/store';
// import { AppState } from '../app.state';
// import { of } from 'rxjs';
// import { selectCartItems } from './vegCrt.selector';
// import { Products } from './vegCart.state';

// @Injectable()
// export class CartEffects {
//  saveCart$ = createEffect(
//    () =>
//      this.actions$.pipe(
//        ofType(addToCart, removeFromCart, increment, decrement),
//        withLatestFrom(this.store.pipe(select(selectCartItems))), 
//        tap(([, cartItems]) => {
//          localStorage.setItem('cartItems', JSON.stringify(cartItems));
//        })
//      ),
//    { dispatch: false }
//  );

//  loadCart$ = createEffect(() =>
//   of('load_cart').pipe(
//     map(() => {
//       const storedCart = localStorage.getItem('cartItems');
//       let cartItems: Products[] = [];
//       if (storedCart) {
//         try {
//           const parsedCart = JSON.parse(storedCart);
//           if (Array.isArray(parsedCart)) {
//             cartItems = parsedCart;
//           } else {
//             console.warn('Cart data from localStorage was not an array:', parsedCart);
//             localStorage.removeItem('cartItems');
//           }
//         } catch (error) {
//           console.error('Error parsing cart data from localStorage:', error);
//           localStorage.removeItem('cartItems');
//         }
//       }
//       console.log('loadCart$ - cartItems to dispatch:', cartItems);
//       return loadCartSuccess({ cartItems });
//     }),
//     catchError(error => {
//       console.error("Error loading cart", error);
//       return of(loadCartFailure({ error }));
//     })
//   )
// );

//  constructor(private actions$: Actions, private store: Store<AppState>) {}
// }
