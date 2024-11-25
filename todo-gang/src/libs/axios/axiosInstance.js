import axios from "axios";
import { getSessionToken } from "../auth/storageManager";
import { refreshToken } from "./user";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_TODO_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// 모든 요청을 시작하기 전에 실행됨
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getSessionToken(); // 세션에서 토큰을 가져옴.
        if (token) {
            // 토큰이 존재하면, 요청 헤더에 Authorization 추가합니다.
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config; // 수정된 설정으로 요청을 계속 진행
    },
    (error) => {
        // 요청 설정 시 오류가 발생하면, 호출하는 쪽으로 오류를 전달
        return Promise.reject(error);
    }
);

// 모든 요청이 실행된 후
// 401에러, 토큰이 만료되었을 경우
axiosInstance.interceptors.response.use(
    (response) => response, // 응답을 그대로 반환
    async (error) => {
        const originRequest = error.config;

        if (error?.response?.status === 401 && !originRequest._retry) {
            originRequest._retry = true;
            try {
                const response = await refreshToken(); // 새로운 accessToken 발급
                originRequest.headers["Authorization"] = `Bearer ${response}`;

                return axiosInstance(originRequest);
            } catch (error) {
                alert("사용자 권한이 없습니다");
                window.location.href("/signin");
                return Promise.reject(error);
            }
        }
        // 403 오류 처리: 로그인 페이지로 리디렉션
        if (error?.response?.status === 403 && !originRequest._retry) {
            originRequest._retry = true; // 재시도 플래그 설정
            window.location.href = "/signin"; // 로그인 페이로 리디렉션
        }
        return Promise.reject(error); // 그 외 오류는 그래도 반환
    }
);
