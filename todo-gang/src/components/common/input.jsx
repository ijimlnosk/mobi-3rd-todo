import styled from "styled-components";
import { colors } from "../../constants/design-token/color";
import { sizes } from "../../constants/design-token/size";
import { SInput } from "../../style/inputStyle";

const Input = ({
    theme,
    size,
    title = "",
    type = "text",
    register,
    registerKey = " ",
    errors = {},
    ...rest
}) => {
    return (
        <Wrapper>
            {title && <label htmlFor={registerKey}>{title}</label>}
            <SInput
                {...register(registerKey)}
                id={registerKey}
                theme={theme}
                size={size}
                type={type}
                {...rest}
            />
            <div
                style={{
                    color: `${colors.SYSTEM.error}`,
                    fontSize: `${sizes.fontSize.small}`,
                }}
            >
                {errors[registerKey] && (
                    <span>{errors[registerKey].message}</span>
                )}
            </div>
        </Wrapper>
    );
};
export default Input;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
