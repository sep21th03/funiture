export const API_ENDPOINT = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        REFRESH_TOKEN: "/auth/refresh",
        FORGOT_PASSWORD: "/auth/forgot-password",
    },
    PRODUCT: {
        GET_PRODUCTS: "/product-list",
        GET_PRODUCT: "/product-detail",
        GET_RELATED_PRODUCTS: "/product-related",
        GET_PRODUCT_BY_CATEGORY: "/product-set",
    },
    CATEGORY: {
        GET_CATEGORIES: "/category",
    },
    ORDER: {
        GET_ORDERS: "/order",
        GET_ORDER: "/order/detail",
        CREATE_ORDER: "/order/store",
        UPDATE_ORDER: "/order/update",
        DELETE_ORDER: "/order/delete",
        VNPAY: "order/vnpay_payment",
    },
    USER: {
        GET_USER: "/user",
        GET_USER_EMAIL: "/getUserbyEmail",
        GET_USER_ID: "/user-id",
        UPDATE_USER: "/user/update",
        DELETE_USER: "/user/delete",
        UPDATE_ADDRESS: "/user/update-address",
        CHANGE_PASSWORD: "/user/change-password",
    },
    CART: {
        GET_CART: "/cart",
        UPDATE_CART: "/cart/update",
        ADD_CART: "/cart/add",
        DELETE_CART: "/cart/delete",
    }
}