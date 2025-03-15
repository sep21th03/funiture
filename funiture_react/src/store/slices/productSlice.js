import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import { calculateTotalAmount, calculateTotalQuantity } from "@/utils";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        cartItems: [],
        cartQuantityTotal: 0,
        cartTotalAmount: 0,
        wishlistItems: [],
        wishListQuantity: 0,
        quickView: false,
        quickViewItems: null,
        isMinicartOpen: false,
        orderItems: []
    },
    reducers: {
        addToCart(state, action) {
            const ItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (ItemIndex >= 0) {
                state.cartItems[ItemIndex].cartQuantity += action.payload.cartQuantity ?? 1;
                state.cartQuantityTotal += action.payload.cartQuantity ?? 1
                state.isMinicartOpen = true;

            } else {
                const tempProduct = { 
                    id: action.payload.id,
                    name: action.payload.name,
                    discount: action.payload.discount,
                    image_path: action.payload.image_path ?? 0,
                    size: action.payload.size,
                    price: action.payload.price,
                    product_hex_id: action.payload.product_hex_id,
                    set_category_name: action.payload.set_category_name,
                    cartQuantity: action.payload.cartQuantity ?? 1,
                }
                state.cartItems.push(tempProduct);
                state.cartQuantityTotal += action.payload.cartQuantity ?? 1;
                state.isMinicartOpen = true;
            }

            state.cartTotalAmount = calculateTotalAmount(state.cartItems);
        },
        removeCartItem(state, action) {
            const filteredCartItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
            const filteredItemQuantity = filteredCartItem.map((item) => {
                return item.cartQuantity;
            })
            state.cartQuantityTotal = filteredItemQuantity.length;
            state.cartItems = filteredCartItem;
        },
        cartQuantityIncrease(state, action) {
            const findItem = state.cartItems.findIndex((item) => item.id === action.payload.id);
            state.cartItems[findItem].cartQuantity += 1;
        },
        cartQuantityDecrease(state, action) {
            const findItem = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (state.cartItems[findItem].cartQuantity > 1) {
                state.cartItems[findItem].cartQuantity -= 1;
            }

        },
        cartClear(state, action) {
            state.cartItems = [];
            state.cartQuantityTotal = 0;
        },
        updateCartAmount(state, action) {
            state.cartTotalAmount = calculateTotalAmount(state.cartItems);
            state.cartQuantityTotal = calculateTotalQuantity(state.cartItems);
        },
        addToWishlist(state, action) {
            const ItemIndex = state.wishlistItems.findIndex((item) => item.id === action.payload.id);
            if (ItemIndex >= 0) {
                Swal.fire({
                    title: action.payload.title,
                    text: 'You already Added the item',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                })
            } else {
                state.wishlistItems.push(action.payload);
                state.wishListQuantity += 1;
                Swal.fire({
                    title: action.payload.title,
                    text: 'Added to your Wishlist',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                })
            }
        },
        removeWishlistItem(state, action) {
            const filteredWishlistItem = state.wishlistItems.filter((wishlistItem) => wishlistItem.id !== action.payload.id);
            state.wishlistItems = filteredWishlistItem;
            state.wishListQuantity = state.wishlistItems.length;
        },
        addToQuickView(state, action) {
            state.quickView = action.payload.quickView;
            state.quickViewItems = action.payload.viewItem;
        },
        miniCartHandler(state, action) {
            state.isMinicartOpen = action.payload;
            if (state.quickView === true) {
                state.quickView = false;
            }
        },
        addToOrder(state, action) {
            state.orderItems.push(action.payload);
            state.cartQuantityTotal = 0;
            state.cartItems = [];
        }
    }
});

export const { addToCart, addToWishlist, removeWishlistItem, addToQuickView, removeCartItem, cartQuantityIncrease, cartQuantityDecrease, cartClear, updateCartAmount, miniCartHandler, addToOrder } = productSlice.actions;

export default productSlice.reducer;



