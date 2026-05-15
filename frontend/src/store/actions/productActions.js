import axiosInstance from "../../api/axiosInstance";
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_PRODUCT_DETAIL,
  FetchStates,
} from "../reducers/productReducer";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products,
});
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});
export const setProductDetail = (product) => ({
  type: SET_PRODUCT_DETAIL,
  payload: product,
});

export const fetchCategories = () => (dispatch) => {
  dispatch(setFetchState(FetchStates.FETCHING));
  return axiosInstance
    .get("/categories")
    .then((res) => dispatch(setCategories(res.data)))
    .catch(() => dispatch(setFetchState(FetchStates.FAILED)));
};

export const fetchProducts =
  (params = {}) =>
  (dispatch) => {
    dispatch(setFetchState(FetchStates.FETCHING));
    const queryParams = new URLSearchParams();
    const limit = params.limit || 25;
    const offset = params.page ? Number(params.page) * limit : 0;

    if (params.category) queryParams.append("category", params.category);
    if (params.filter) queryParams.append("filter", params.filter);
    if (params.sort) queryParams.append("sort", params.sort);
    queryParams.append("limit", limit);
    queryParams.append("offset", offset);

    return axiosInstance
      .get(`/products/shop?${queryParams.toString()}`)
      .then((res) => {
        dispatch(setProductList(res.data.products));
        dispatch(setTotal(res.data.totalCount));
        dispatch(setFetchState(FetchStates.FETCHED));
      })
      .catch(() => dispatch(setFetchState(FetchStates.FAILED)));
  };

export const fetchProductDetail = (productId) => (dispatch) => {
  dispatch(setFetchState(FetchStates.FETCHING));
  return axiosInstance
    .get(`/products/${productId}`)
    .then((res) => dispatch(setProductDetail(res.data)))
    .catch(() => dispatch(setFetchState(FetchStates.FAILED)));
};

export const fetchDailyDeals = () => axiosInstance.get("/products/daily-deals");
