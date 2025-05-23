import { createSelector, createFeatureSelector } from '@ngrx/store';
import { cartState, Products } from './vegCart.state';

export const selectCart = createFeatureSelector<cartState>('cart');

export const selectCartItems = createSelector(
  selectCart,
  (state: cartState) => state.cartItems
);
