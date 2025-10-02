// src/redux/slice/client.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as clientService from "../service/Client";
import {clientModel,clientCreateModel, clientDiplomaModelReport } from "../../models/Diploma";


export const fetchClients = createAsyncThunk(
  "client/client",
  async (filters = {}, thunkAPI) => {
    try {
      const data = await clientService.fetchClients(filters);
    
      const clientList = data.data.results.map((prod) => clientModel(prod));
      
      if (data.next){
        return {
          clientList,
          next:true
        }
      }
      
      return clientList; 
    } catch (err) {
      
      return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل تحميل المنتجات");
    }
  }
);


export const createClient = createAsyncThunk(
  "client/createClient",
  async (formData, thunkAPI) => {
    try {
      const data = await clientService.createClient(formData);
      console.log(data?.data?.data,'ssssssssssssssssssssssssssssssssssssssssssssssssssss')
     const User = clientCreateModel(data?.data?.data);
       localStorage.setItem("newClient", JSON.stringify(User)); 
     return User;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل التسجيل");
    }
  }
);

export const fetchClient = createAsyncThunk(
  "client/createClient",
  async (formData, thunkAPI) => {
    try {
      const data = await clientService.createClient(formData);
     const User = clientModel(data.user);
     console.log(data)
      return User;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل التسجيل");
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "client/clientDetail",
  async ({slug}, thunkAPI) => {
    try {
      const data = await clientService.fetchProductDetail({slug});
      const clientDetail = clientModel(data.data);
      return clientDetail;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل تحميل المنتجات");
    }
  }
);


export const reportDetail = createAsyncThunk(
  "client/reportDetail",
  async (params = {}, thunkAPI) => {
    try {
      const data = await clientService.reportDetail(params);
      console.log(data,'datafrom selice')
      const clientDetail = data.data.results.map((prod) => clientDiplomaModelReport(prod));
      
      return clientDetail;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل تحميل التقرير");
    }
  }
);



const clientSlice = createSlice({
  name: "client",
  initialState: {
    loading: false,
    error: null,
    success: false,
    categories: [],
    clients:[],
    clientDetail:null,
    newClient: JSON.parse(localStorage.getItem("newClient")) || null,
    
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
       .addCase(fetchClients.pending,(state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(fetchProductDetail.pending,(state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.newClient = action.payload;
        localStorage.setItem("newClient", JSON.stringify(action.payload));
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem("newClient");
      })
  },
});

export const { resetProductState } = clientSlice.actions;
export default clientSlice.reducer;
