import { createAction, props } from "@ngrx/store";
import { Products } from "./vegCart.state";

export const addToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Products }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: number }>()
);

export const increment = createAction(
  '[Cart] Increment Quantity',
  props<{ productId: number }>()
);

export const decrement = createAction(
  '[Cart] Decrement Quantity',
  props<{ productId: number }>()
);





















// export const loadCartSuccess = createAction(
//     '[Cart/API] Load Cart Success',
//     props<{ cartItems: Products[] }>()
//   );

//   export const loadCartFailure = createAction(
//     '[Cart/API] Load Cart Failure',
//     props<{ error: any }>()
//   );
