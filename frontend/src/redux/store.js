import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./categories/categoriesSlice"
import blogSlice from "./blog/blogSlice"


const store = configureStore({
    reducer: {
      categories: categorySlice,
      blogs: blogSlice,

    },
});

export default store;
