import { configureStore } from "@reduxjs/toolkit";
import refreshSlice from "./refresh-slice";

const store = configureStore({
    reducer: { refresh: refreshSlice.reducer }
});

export default store;