import axiosInstance from "@/utils/axiosInstance";
import { API_ENDPOINT } from "@/services/apis";

export const fetchUserByEmail = async (email) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINT.USER.GET_USER_EMAIL, { email });
        return response.data;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
}

export const fetchUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_ENDPOINT.USER.GET_USER_ID}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw error;
    }
}