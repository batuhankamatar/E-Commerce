import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";
import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import favoritesReducer from "./reducers/favoritesReducer";
import authReducer from "./reducers/authReducer";

const logger = createLogger();

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  favorites: favoritesReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
