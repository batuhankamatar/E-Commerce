import axiosInstance from "../../api/axiosInstance";

const initialState = {
  categories: [],
  productList: [],
  productDetail: {},
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED",
  dailyDeals: [],
  loading: false,
};

export const SET_CATEGORIES = "product/SET_CATEGORIES";
export const SET_PRODUCT_LIST = "product/SET_PRODUCT_LIST";
export const SET_PRODUCT_DETAIL = "product/SET_PRODUCT_DETAIL";
export const SET_TOTAL = "product/SET_TOTAL";
export const SET_FETCH_STATE = "product/SET_FETCH_STATE";
export const SET_LIMIT = "product/SET_LIMIT";
export const SET_OFFSET = "product/SET_OFFSET";
export const SET_FILTER = "product/SET_FILTER";
export const SET_DAILY_DEALS = "product/SET_DAILY_DEALS";
export const SET_LOADING = "product/SET_LOADING";

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_DAILY_DEALS:
      return { ...state, dailyDeals: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default productReducer;
