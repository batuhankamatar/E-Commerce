import axiosInstance from "../../api/axiosInstance";

import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_PRODUCT_DETAIL,
  SET_DAILY_DEALS,
  SET_LOADING,
} from "../reducers/productReducer";

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products,
});
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state,
});

export const fetchProducts =
  (params = {}) =>
  (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    dispatch(setFetchState("FETCHING"));

    const queryParams = new URLSearchParams();

    if (params.category) queryParams.append("category", params.category);
    if (params.filter) queryParams.append("filter", params.filter);

    let sortValue = params.sort || "";
    if (sortValue.includes(":")) {
      sortValue = sortValue.replace(":", "_");
    }
    if (sortValue) queryParams.append("sort", sortValue);

    queryParams.append("limit", params.limit || 25);
    queryParams.append("offset", params.offset || 0);

    return axiosInstance
      .get(`/products/shop?${queryParams.toString()}`)
      .then((res) => {
        dispatch(setProductList(res.data.products || []));
        dispatch(setTotal(res.data.totalCount || 0));
        dispatch(setFetchState("FETCHED"));
      })
      .catch((err) => {
        console.error("Fetch Products Error:", err);
        dispatch(setFetchState("FAILED"));
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false });
      });
  };

export const fetchCategories = () => (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  return axiosInstance
    .get("/categories")
    .then((res) => {
      dispatch({ type: SET_CATEGORIES, payload: res.data });
      dispatch(setFetchState("FETCHED"));
    })
    .catch(() => dispatch(setFetchState("FAILED")));
};

export const fetchDailyDeals = () => async (dispatch) => {
  dispatch({ type: "product/SET_LOADING", payload: true });
  try {
    const response = await axiosInstance.get("/products/daily-deals");
    dispatch({ type: "product/SET_DAILY_DEALS", payload: response.data });
  } catch (error) {
    console.error("Daily deals çekilemedi:", error);
  } finally {
    dispatch({ type: "product/SET_LOADING", payload: false });
  }
};

export const fetchProductDetail = (productId) => (dispatch) => {
  dispatch({ type: "product/SET_LOADING", payload: true });
  return axiosInstance
    .get(`/products/${productId}`)
    .then((res) => {
      dispatch({ type: "product/SET_PRODUCT_DETAIL", payload: res.data });
    })
    .catch((err) => {
      console.error("Ürün detayı çekilemedi:", err);
    })
    .finally(() => {
      dispatch({ type: "product/SET_LOADING", payload: false });
    });
};
