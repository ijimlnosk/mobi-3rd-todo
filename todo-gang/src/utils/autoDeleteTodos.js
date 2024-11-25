import { deleteTodo, getTodo } from "../libs/axios/todo";
import { formattedDate } from "./\bformattedDate";

export const AutoDeleteTodos = async () => {
    try {
        const currentDate = formattedDate(new Date());
        let page = 1;
        let isMore = true;

        while (isMore) {
            const todoResponse = await getTodo({ page: page });

            if (!todoResponse || Object.keys(todoResponse).length === 0) {
                isMore = false;
                break;
            }

            const todos = Object.values(todoResponse).filter(
                (item) =>
                    typeof item === "object" &&
                    item.idx &&
                    formattedDate(item.createdAt) < currentDate
            );

            if (todos.length === 0) {
                break;
            }

            for (const todo of todos) {
                await deleteTodo({ todoId: todo.idx });
            }
            page++;
        }
    } catch (error) {
        console.error("Todo 삭제 error : ", error);
    }
};
