import { useState } from "react";
import { colors } from "../../constants/design-token/color";
import { sizes } from "../../constants/design-token/size";
import { STextArea } from "../../style/textarea.style";

const TextArea = ({
    theme,
    size,
    title = "",
    type = "text",
    registerKey = "",
    register = () => {},
    validate = {},
    errors = {},
    maxLength = 300,
    ...rest
}) => {
    const [text, setText] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <>
            {title && <label htmlFor={registerKey}>{title}</label>}
            <STextArea
                {...register(registerKey, {
                    ...validate,
                    onChange: handleTextChange,
                })}
                id={registerKey}
                theme={theme}
                size={size}
                type={type}
                maxLength={maxLength}
                value={text}
                onChange={handleTextChange}
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
                <div>{`${text.length} / ${maxLength}`}</div>
            </div>
        </>
    );
};
export default TextArea;
