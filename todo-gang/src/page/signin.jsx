import { useForm } from "react-hook-form";
import Box from "../components/common/box";
import Input from "../components/common/input";
import { signinSchema } from "../schemas/signin-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/common/button";
import Spacer from "../components/common/spacer";
import spacing from "../constants/design-token/spacing";
import styled from "styled-components";
import { sizes } from "../constants/design-token/size";
import { BsArrowRight } from "react-icons/bs";
import { colors } from "../constants/design-token/color";
import { useNavigate } from "react-router-dom";
import { postSignin } from "../libs/axios/user";
import { setSessionToken } from "../libs/auth/storageManager";

const Signin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange", resolver: yupResolver(signinSchema) });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const result = await postSignin(data);
        try {
            if (result && result.token) {
                setSessionToken(result.token);
                navigate("/");
            } else {
                alert(
                    "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요."
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onClickSignup = () => {
        navigate("/signup");
    };

    return (
        <Box backgroundColor={colors.MINT.paleMint}>
            <ThumbNail>
                <ThumbNailImg src="https://i.ibb.co/Sc6dCP2/todo-list-thumbnail.webp" />
            </ThumbNail>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <Input
                    title="email"
                    theme={"blossomTheme"}
                    size={"small"}
                    register={register}
                    registerKey="email"
                    errors={errors}
                    placeholder="Todo@example.com의 양식으로 입력해주세요"
                />
                <Spacer width={spacing.medium} height={spacing.medium} />
                <Input
                    title="password"
                    theme={"blossomTheme"}
                    size={"small"}
                    register={register}
                    registerKey="pw"
                    errors={errors}
                    type="password"
                    placeholder="대소문자,숫자,특수문자를 하나 이상 포함해 주세요"
                />
                <Spacer width={spacing.medium} height={spacing.medium} />
                <Button theme={"springTheme"} size={"small"}>
                    로그인
                </Button>
            </FormWrapper>
            <Spacer width={spacing.xlarge} height={spacing.xlarge} />
            <Wrapper>
                <Lable>아직 회원이 아니신가요?</Lable>
                <Button theme={"blossomTheme"} onClick={onClickSignup}>
                    가입하러가기 <BsArrowRight />
                </Button>
            </Wrapper>
        </Box>
    );
};
export default Signin;

const ThumbNail = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ThumbNailImg = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    box-shadow: 2px 2px 10px 4px ${colors.LAVENDER.lightLavender};
`;

const FormWrapper = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div``;

const Lable = styled.label`
    font-size: ${sizes.fontSize.small};
`;
