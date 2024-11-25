import * as Yup from "yup";

export const signupScheme = Yup.object().shape({
    email: Yup.string()
        .required("이메일을 입력해주세요")
        .email("유효한 이메일 주소를 입력해주세요")
        .matches(/^.+@.+\..+$/, "유효한 이메일 주소를 입력해주세요"),

    pw: Yup.string()
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
            "대소문자, 숫자, 특수문자를 하나 이상 포함해 주세요"
        )
        .min(8, "8글자 이상 입력해주세요")
        .required("비밀번호를 입력해주세요"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("pw"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력해주세요"),
});
