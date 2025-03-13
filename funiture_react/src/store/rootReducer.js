import { combineReducers } from "@reduxjs/toolkit"
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import menuReducer from "./slices/menuSlice";

const rootReducer = combineReducers({
    product: productReducer,
    auth: authReducer,
    menu: menuReducer,
});

export default rootReducer;