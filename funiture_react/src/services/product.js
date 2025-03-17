import axiosInstance from "@/utils/axiosInstance";
import { API_ENDPOINT } from "@/services/apis";

export const fetchProductData = async () => {
    try {
        const response = await axiosInstance.get(`${API_ENDPOINT.PRODUCT.GET_PRODUCTS}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};

export const fetchSingleProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_ENDPOINT.PRODUCT.GET_PRODUCT}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching single product data:", error);
        throw error;
    }
};

export const fetchRelatedProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_ENDPOINT.PRODUCT.GET_RELATED_PRODUCTS}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching related product data:", error);
        throw error;
    }
};


export const fetchCategory = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINT.CATEGORY.GET_CATEGORIES);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const fetchProductByCategory = async (category) => {
    try {
        const response = await axiosInstance.get(`${API_ENDPOINT.PRODUCT.GET_PRODUCT_BY_CATEGORY}/${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by category:", error);
        throw error;
    }
}