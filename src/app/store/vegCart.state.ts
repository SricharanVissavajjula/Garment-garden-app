export interface Products {
    id: number;
    product_name: string;
    price: number;
    category: string;
    quantity: number;
    image: string;
    weight: number;
    count: number;
    addedToCart: boolean;
    splcat : string;
    discount : number
  }
  
  export interface cartState {
    cartItems: Products[],
  }
  
  export const initialCartState: cartState = {
    cartItems: [],
  };
  