import { SButton } from "../../style/buttonStyle";

const Button = ({
    theme,
    size,
    disabled,
    $isActive,
    onClick,
    type,
    children,
}) => {
    const disabledTheme = "morningDewTheme";

    const buttonTheme = disabled ? disabledTheme : theme;

    return (
        <SButton
            theme={buttonTheme}
            size={size}
            onClick={onClick}
            disabled={disabled}
            isActive={$isActive}
            type={type}
        >
            {children}
        </SButton>
    );
};
export default Button;
