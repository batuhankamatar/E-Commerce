const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const SET_CART = "shoppingCart/SET_CART";
const SET_PAYMENT = "shoppingCart/SET_PAYMENT";
const SET_ADDRESS = "shoppingCart/SET_ADDRESS";

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});
export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

export default shoppingCartReducer;
