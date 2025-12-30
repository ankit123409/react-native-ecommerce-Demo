import { ADD_TO_CART, Product, AddToCartAction, INCREMENT_QTY, DECREMENT_QTY, IncrementQtyAction, DecrementQtyAction } from '../types/cartTypes';

export const addToCart = (product: Product): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});
export const incrementQty = (id: string): IncrementQtyAction => ({
  type: INCREMENT_QTY,
  payload: id,
});

export const decrementQty = (id: string): DecrementQtyAction => ({
  type: DECREMENT_QTY,
  payload: id,
});