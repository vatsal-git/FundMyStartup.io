import { combineReducers, configureStore } from "@reduxjs/toolkit";

import apiInstance from "./apis/createApiInstance";
import user from "./user";

const rootReducer = combineReducers({
  [apiInstance.reducerPath]: apiInstance.reducer,
  user,
});

const reducer = (state, action) => rootReducer(state, action);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiInstance.middleware),
});
