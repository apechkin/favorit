import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
};

const goodsSearchSlice = createSlice({
  name: "goodsSearch",
  initialState,
  reducers: {
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = goodsSearchSlice.actions;
export const currentNumberSelector = (state) => state.goodsSearch.inputValue;
export default goodsSearchSlice.reducer;
