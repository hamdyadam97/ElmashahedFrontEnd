import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slice/Auth';
import diplomaReducer from '../redux/slice/Diploma';
import clientReducer from '../redux/slice/Client';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    diploma: diplomaReducer, 
    client: clientReducer

  },
});

export default store;
