import * as Yup from "yup";

export const todoSchema = Yup.object().shape({
    title: Yup.string().trim().required("내용이 없습니다."),
    content: Yup.string().trim().required("내용이 없습니다."),
});
