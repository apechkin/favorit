import { createSlice } from "@reduxjs/toolkit";
import { goodsApi } from "./goodsApi";

const initialState = {
  selectedBrand: "",
  lastGoodsNumber: "",
  analogues: false,
};

const goodsFilterSlice = createSlice({
  name: "goodsFilter",
  initialState,
  reducers: {
    setCurrentBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setAnalogues: (state, action) => {
      state.analogues = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      goodsApi.endpoints.getGoodsByParams.matchFulfilled,
      (state, action) => {
        const currentNumber = action.meta.arg.originalArgs.number;
        if (state.lastGoodsNumber !== currentNumber) {
          state.selectedBrand = "";
          state.analogues = false;
          state.lastGoodsNumber = currentNumber;
        }
      },
    );
  },
});

export const { setCurrentBrand, setAnalogues } = goodsFilterSlice.actions;
export const currentBrandSelector = (state) => state.goodsFilter.selectedBrand;
export const analoguesSelector = (state) => state.goodsFilter.analogues;
export default goodsFilterSlice.reducer;
