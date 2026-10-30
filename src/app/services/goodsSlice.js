import { createSlice } from "@reduxjs/toolkit";
import { goodsApi } from "./goods";

const initialState = {
  selectedBrand: "",
};

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setCurrentBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      goodsApi.endpoints.getGoodsByParams.matchFulfilled,
      () => initialState,
    );
  },
});

export const { setCurrentBrand } = goodsSlice.actions;
export const currentBrandSelector = (state) => state.goods.selectedBrand;
export default goodsSlice.reducer;
