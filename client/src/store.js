import { configureStore } from "@reduxjs/toolkit";
//reducers
import { apiSlice } from "./apiSlices/index";
import testReducer from "./slices/testSlice";
import authReducer from "./slices/authSlice";
import propertyReducer from "./slices/propertySlice";
import alertReducer from "./slices/alertSlice";

const store = configureStore({
  reducer: {
    testReducer,
    authReducer,
    propertyReducer,
    alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],

  devTools: true,
});

// console.log(apiSlice, " appppp");
export default store;
