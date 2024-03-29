import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "@/store";

export interface titleState {
  title: any,  
}

const initialState: titleState = {
  title: [''],
};

export const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    titleStatus: (state, action) => {
      state.title = action.payload;
    },
  }
});

export const { titleStatus } = titleSlice.actions;
export const selectTitle = (state: RootState) => state.title;
export default titleSlice.reducer;