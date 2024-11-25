import { useForm } from "react-hook-form";
import Box from "../components/common/box";
import Input from "../components/common/input";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/common/button";
import Spacer from "../components/common/spacer";
import spacing from "../constants/design-token/spacing";
import styled from "styled-components";
import { colors } from "../constants/design-token/color";
import { useNavigate } from "react-router-dom";
import { signupScheme } from "../schemas/signup-schema";
import { postSignup } from "../libs/axios/user";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange", resolver: yupResolver(signupScheme) });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const result = await postSignup(data);
        try {
            if (result.status === "success") {
                alert(result.message);
                navigate("/signin");
            }
        } catch (error) {
            console.error(error, "error");
            if (error?.response?.status === 400) {
                alert(error?.response?.data?.message);
            }
        }
    };

    return (
        <Container>
            <Box backgroundColor={colors.MINT.paleMint}>
                <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        title="이메일"
                        theme={"blossomTheme"}
                        size={"small"}
                        register={register}
                        registerKey="email"
                        errors={errors}
                        placeholder="Todo@example.com의 양식으로 입력해주세요"
                    />
                    <Spacer width={spacing.medium} height={spacing.xlarge} />
                    <Input
                        title="비밀번호"
                        theme={"blossomTheme"}
                        size={"small"}
                        register={register}
                        registerKey="pw"
                        errors={errors}
                        type="password"
                        placeholder="대소문자,숫자,특수문자를 하나 이상 포함해 주세요"
                    />

                    <Spacer width={spacing.medium} height={spacing.xlarge} />
                    <Input
                        title="비밀번호 확인"
                        theme={"blossomTheme"}
                        size={"small"}
                        register={register}
                        registerKey="confirmPassword"
                        errors={errors}
                        type="password"
                        placeholder="비밀번호를 다시 입력해 주세요"
                    />
                    <Spacer width={spacing.medium} height={spacing.xlarge} />
                    <Button
                        theme={"springTheme"}
                        size={"small"}
                        disabled={!isValid}
                    >
                        가입하기
                    </Button>
                </FormWrapper>
                <Spacer width={spacing.xlarge} height={spacing.xlarge} />
            </Box>
        </Container>
    );
};
export default Signup;

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
`;

const FormWrapper = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
