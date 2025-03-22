import axiosInstance from "@/utils/axiosInstance";
import { logIn, logOut, refreshUserToken as refreshTokenAction } from "@/store/slices/authSlice";
import { API_ENDPOINT } from "@/services/apis";

export const login = async (data, dispatch, router, setLoginError) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT.AUTH.LOGIN}`, data);

    if (response.data.status === "success") {
      dispatch(logIn({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      }));
      router.push("/home/furniture");
    } else {
      setLoginError(response.data.message || "Đăng nhập không thành công");
    }
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi đăng nhập";
    setLoginError(errorMessage);
  }
};

export const registerUser = async (data, dispatch, router, setRegisterError) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT.AUTH.REGISTER}`, data);

    if (response.data.status === "success") {
      dispatch(logIn({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      }));
      router.push("/home/furniture");
      Swal.fire({
        title: "Thành công!",
        text: "Đang chuyển hướng website",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } else {
      setRegisterError(response.data.message || "Đăng ký không thành công");
    }
  } catch (error) {
    console.error("Register error:", error);
    const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký";
    setRegisterError(errorMessage);
  }
};

export const logout = async (dispatch, router) => {
  try {
    await axiosInstance.post(`${API_ENDPOINT.AUTH.LOGOUT}`);

    dispatch(logOut());

    router.push("/auth/login");
  } catch (error) {
    console.error("Logout error:", error);
    dispatch(logOut());
    router.push("/auth/login");
  }
};

export const refreshUserToken = async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axiosInstance.post(`${API_ENDPOINT.AUTH.REFRESH}`, {
      refresh_token: refreshToken
    });

    if (response.data.status === "success") {
      dispatch(refreshTokenAction({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      }));

      return true;
    }
    return false;
  } catch (error) {
    console.error("Token refresh error:", error);
    dispatch(logOut());
    return false;
  }
};

export const forgotPassword = async (data, route, setForgotEmailError) => {
  try {
    const response = await axiosInstance.post(`${API_ENDPOINT.AUTH.FORGOT_PASSWORD}`, data);

    if (response.data.status === "success") {
      setForgotEmailError({ success: "Mật khẩu mới đã được gửi đến email của bạn." });
      setTimeout(() => {
        route.push("/sign-in");
      }, 2000);
    } else {
      setForgotEmailError({ error: response.data.message || "Có lỗi xảy ra!" });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi gửi yêu cầu.";
    setForgotEmailError({ error: errorMessage });
  }
}