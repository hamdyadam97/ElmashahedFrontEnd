// src/redux/slice/product.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as diplomaService from "../service/Diploma";
import { diolomaModel } from "../../models/Diploma";

// جلب التصنيفات
export const fetchDiplomas = createAsyncThunk(
  "diploma/fetch",
  async (type, thunkAPI) => {
    try {
      const data = await diplomaService.fetchDiplomas(type);
      const diplomaList = data.map((dip) => diolomaModel(dip));
      return diplomaList;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "فشل تحميل التصنيفات"
      );
    }
  }
);



const diplomaSlice = createSlice({
  name: "diploma",
  initialState: {
    loading: false,
    error: null,
    success: false,
    diplomas: [],
    
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiplomas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiplomas.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.diplomas = action.payload;
      })
      .addCase(fetchDiplomas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
      
     
  },
});

export const { resetDiplomasState } = diplomaSlice.actions;
export default diplomaSlice.reducer;
