export const ADD_TO_CART = "shoppingCart/ADD_TO_CART";
export const REMOVE_FROM_CART = "shoppingCart/REMOVE_FROM_CART";
export const UPDATE_CART_QUANTITY = "shoppingCart/UPDATE_CART_QUANTITY";
export const TOGGLE_CART_ITEM = "shoppingCart/TOGGLE_CART_ITEM";
export const CLEAR_CART = "shoppingCart/CLEAR_CART";
export const SET_CART_LIST = "shoppingCart/SET_CART_LIST";

const initialState = {
  cart: [],
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_LIST:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingIndex > 0 || existingIndex === 0) {
        const newCart = [...state.cart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          count: newCart[existingIndex].count + quantity,
        };
        return { ...state, cart: newCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { count: quantity, checked: true, product }],
        };
      }
    }

    case UPDATE_CART_QUANTITY: {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, count: quantity } : item,
        ),
      };
    }

    case TOGGLE_CART_ITEM: {
      const { productId } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId
            ? { ...item, checked: !item.checked }
            : item,
        ),
      };
    }

    case REMOVE_FROM_CART: {
      const { productId } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== productId),
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;
