import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { cardApi } from "./services/cardsApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [cardApi.reducerPath]: cardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(cardApi.middleware)
});