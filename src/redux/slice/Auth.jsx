// src/redux/slice/auth.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../service/Auth";
import { userModel } from "../../models/User";

// تسجيل حساب
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, thunkAPI) => {
    try {
      const data = await authService.signup(formData);
     const User = userModel(data.user);
      return User;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل التسجيل");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access");
  return true;
});

// تسجيل دخول
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await authService.login(credentials);
      console.log(data.data,'data')
      const User = userModel(data.data);
      localStorage.setItem("user", JSON.stringify(User));
     
      return User;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل تسجيل الدخول");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    success: false,

   
    user: JSON.parse(localStorage.getItem("user")) || null,
    access: localStorage.getItem("token") || null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true
        state.user = action.payload;
        state.token = action.payload.access;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.success = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
