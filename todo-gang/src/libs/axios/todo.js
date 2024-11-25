import { axiosInstance } from "./axiosInstance";

// todo 생성
export const postAddTodo = async ({ title, content }) => {
    try {
        const response = await axiosInstance.post("/todo", {
            title,
            content,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// todo 가져오기
export const getTodo = async ({ page }) => {
    try {
        const response = await axiosInstance.get(`/todo`, {
            params: {
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// todo 수정하기
export const patchTodo = async ({ todoId, title, content, state }) => {
    try {
        const response = await axiosInstance.patch(`/todo?todoId=${todoId}`, {
            title,
            content,
            state,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// todo 삭제하기
export const deleteTodo = async ({ todoId }) => {
    try {
        const response = await axiosInstance.delete(`/todo/${todoId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
