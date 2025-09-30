// // src/redux/slice/product.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as productService from "../service/Product";
// // import { categoryModel,productModel } from "../../models/Diploma";

// // // جلب التصنيفات
// // export const fetchCategories = createAsyncThunk(
// //   "product/categories",
// //   async (_, thunkAPI) => {
// //     try {
// //       const data = await productService.fetchCategories();
// //       const categoryList = data.map((cat) => categoryModel(cat));
// //       return categoryList;
// //     } catch (err) {
// //       return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل تحميل التصنيفات");
// //     }
// //   }
// // );

// // // redux/slice/Product.js

// // export const fetchProducts = createAsyncThunk(
// //   "product/product",
// //   async (filters = {}, thunkAPI) => {
// //     try {
// //       const data = await productService.fetchProducts(filters);
// //       const productList = data.results.map((prod) => productModel(prod));
// //       if (data.next){
// //         return {
// //           productList,
// //           next:true
// //         }
// //       }
// //       return productList; 
// //     } catch (err) {
// //       return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل تحميل المنتجات");
// //     }
// //   }
// // );


// // export const fetchProductDetail = createAsyncThunk(
// //   "product/productDetail",
// //   async ({slug}, thunkAPI) => {
// //     try {
// //       const data = await productService.fetchProductDetail({slug});
// //       console.log(data,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
// //       const productDetail = productModel(data.data);
// //         console.log(productDetail,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
// //       return productDetail;
// //     } catch (err) {
// //       return thunkAPI.rejectWithValue(err.response?.data?.message || "فشل تحميل المنتجات");
// //     }
// //   }
// // );

// // const productSlice = createSlice({
// //   name: "product",
// //   initialState: {
// //     loading: false,
// //     error: null,
// //     success: false,
// //     categories: [],
// //     products:[],
// //     productDetail:null,
// //   },
// //   reducers: {
// //     resetProductState: (state) => {
// //       state.loading = false;
// //       state.error = null;
// //       state.success = false;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchCategories.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchCategories.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.categories = action.payload;
// //       })
// //       .addCase(fetchCategories.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })
// //        .addCase(fetchProducts.pending,(state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchProducts.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.products = action.payload;
// //       })
// //       .addCase(fetchProducts.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       }) .addCase(fetchProductDetail.pending,(state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchProductDetail.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.productDetail = action.payload;
// //       })
// //       .addCase(fetchProductDetail.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { resetProductState } = productSlice.actions;
// // export default productSlice.reducer;
