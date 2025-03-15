import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {setupListeners} from "@reduxjs/toolkit/query";

export const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({ serializableCheck: false }),
    });

    setupListeners(store.dispatch);

    return store;
}
export const store = makeStore();
