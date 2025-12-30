import {
  ADD_TO_CART,
  CartState,
  CartActionTypes,
  INCREMENT_QTY,
  DECREMENT_QTY,
} from '../types/cartTypes';

const initialState: CartState = {
  items: [],
};

const cartReducer = (
  state: CartState = initialState,
  action: CartActionTypes,
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
    console.log('Cart Reducer - Action:', action);          

      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
  case INCREMENT_QTY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case DECREMENT_QTY:
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter(item => item.quantity > 0),
      };
    default:
      return state;
  }
};

export default cartReducer;
