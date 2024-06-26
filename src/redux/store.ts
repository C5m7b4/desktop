import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app";
import counterReducer from "./counter";

const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
