export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QTY = 'INCREMENT_QTY';
export const DECREMENT_QTY = 'DECREMENT_QTY';


export interface Product {
  id: string;
  brand: string;
  title: string;
  price: string;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

export interface IncrementQtyAction {
  type: typeof INCREMENT_QTY;
  payload: string; // product id
}

export interface DecrementQtyAction {
  type: typeof DECREMENT_QTY;
  payload: string;
}

export type CartActionTypes =
  | AddToCartAction
  | IncrementQtyAction
  | DecrementQtyAction;

