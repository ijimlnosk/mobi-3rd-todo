import { axiosInstance } from "./axiosInstance";

// 회원가입 API
export const postSignup = async ({ email, pw }) => {
    try {
        const response = await axiosInstance.post("/todo/user/sign-up", {
            email,
            pw,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 로그인 API
export const postSignin = async ({ email, pw }) => {
    try {
        const response = await axiosInstance.post("/todo/user/sign-in", {
            email,
            pw,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 로그아웃 API
export const postSignOut = async () => {
    const response = await axiosInstance.post("/todo/user/sign-out");
    return response.data;
};

// refreshToken API
export const refreshToken = async () => {
    try {
        const response = await axiosInstance.get("/todo/user/refresh");

        if (response.status === 200) {
            return { success: true, token: response.data.token };
        } else {
            return {
                success: false,
                message: response.data.message || "접근 권한이 없습니다.",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message || "오류가 발생했습니다.",
        };
    }
};
