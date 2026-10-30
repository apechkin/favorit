import { createSlice } from "@reduxjs/toolkit";

const goodsSlice = createSlice({
  name: "goods",
  initialState: { selectedBrand: "" },
  reducers: {
    setCurrentBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
  },
});

export const { setCurrentBrand } = goodsSlice.actions;
export const currentBrandSelector = (state) => state.goods.selectedBrand;
export default goodsSlice.reducer;
