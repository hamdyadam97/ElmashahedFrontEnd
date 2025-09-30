import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slice/Auth';
import diplomaReducer from '../redux/slice/Diploma';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    diploma: diplomaReducer, 

  },
});

export default store;
