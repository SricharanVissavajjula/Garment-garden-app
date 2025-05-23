import { createReducer, on } from "@ngrx/store";
import { cartState, initialCartState } from "./vegCart.state";
import { addToCart, removeFromCart, decrement, increment} from "./vegCart.action";

export const cartReducer = createReducer(
  initialCartState,

  on(addToCart, (state, { product }) => {
    return {
     ...state,
    cartItems: [...state.cartItems, { ...product, count: 1, addedToCart: true }],
     };
    }),

  on(increment, (state, { productId }) => ({
    ...state,
    cartItems: state.cartItems.map(p =>
      p.id === productId ? { ...p, count: p.count + 1 } : p
    )
  })),

  on(decrement, (state, { productId }) => ({
    ...state,
    cartItems: state.cartItems
      .map(p =>
        p.id === productId ? { ...p, count: p.count - 1 } : p
      )
      .filter(p => p.count > 0)
  })),

  on(removeFromCart, (state, { productId }) => ({
    ...state,
    cartItems: state.cartItems.filter(p => p.id !== productId),
  })),
)











