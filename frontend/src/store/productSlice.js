import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const productSlice = createSlice({
  name: "product",
  initialState: {
    categories: [],
    dailyDeals: [],
    loading: false,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setDailyDeals: (state, action) => {
      state.dailyDeals = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategories, setDailyDeals, setLoading } =
  productSlice.actions;

export const fetchDailyDeals = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get("/products/daily-deals");
    dispatch(setDailyDeals(response.data));
  } catch (error) {
    console.error("Daily deals çekilirken hata oluştu:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
