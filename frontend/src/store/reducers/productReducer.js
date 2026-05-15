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

const SET_CATEGORIES = "product/SET_CATEGORIES";
const SET_PRODUCT_LIST = "product/SET_PRODUCT_LIST";
const SET_PRODUCT_DETAIL = "product/SET_PRODUCT_DETAIL";
const SET_TOTAL = "product/SET_TOTAL";
const SET_FETCH_STATE = "product/SET_FETCH_STATE";
const SET_LIMIT = "product/SET_LIMIT";
const SET_OFFSET = "product/SET_OFFSET";
const SET_FILTER = "product/SET_FILTER";
const SET_DAILY_DEALS = "product/SET_DAILY_DEALS";
const SET_LOADING = "product/SET_LOADING";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});
export const setProductDetail = (product) => ({
  type: SET_PRODUCT_DETAIL,
  payload: product,
});
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setDailyDeals = (dailyDeals) => ({
  type: SET_DAILY_DEALS,
  payload: dailyDeals,
});
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const response = await axiosInstance.get("/categories");
    dispatch(setCategories(response.data));
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    dispatch(setFetchState("ERROR"));
  }
};

export const fetchProducts =
  (categoryId = null, filter = "", sort = "", offset = 0) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const params = { limit: 25, offset };
      if (categoryId) params.category = categoryId;
      if (filter) params.filter = filter;
      const sortMap = {
        price_asc: "price:asc",
        price_desc: "price:desc",
        rating: "rating:desc",
        newest: "date:desc",
        popularity: "rating:desc",
      };
      if (sort && sortMap[sort]) params.sort = sortMap[sort];

      const response = await axiosInstance.get("/products", { params });
      dispatch(setTotal(response.data.total || 0));
      dispatch(setProductList(response.data.products || []));
      dispatch(setOffset(offset));
    } catch (error) {
      console.error("Ürünler çekilemedi:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchProductDetail = (productId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    dispatch(setProductDetail(response.data));
  } catch (error) {
    console.error("Ürün detayı çekilemedi:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDailyDeals = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get(
      "/products?sort=price:asc&limit=3",
    );
    if (response.data && response.data.products)
      dispatch(setDailyDeals(response.data.products));
  } catch (error) {
    console.error("Daily deals hatası:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

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
