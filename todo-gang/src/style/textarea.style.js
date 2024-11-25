import styled, { css } from "styled-components";
import { colors } from "../constants/design-token/color";
import { sizes } from "../constants/design-token/size";

const ColorCSS = {
    blossomTheme: css`
        color: ${colors.GRAY.nearBlackGray};
        background-color: ${colors.PINK.cherryBlossom};
        border: 1px solid ${colors.PINK.lightPink};
    `,
    morningDewTheme: css`
        color: ${colors.BLUE.pastelBlue};
        background-color: ${colors.GREEN.lightGreen};
        border: 1px solid ${colors.BLUE.softBlue};
    `,
    springBreezeTheme: css`
        color: ${colors.GREEN.springGreen};
        background-color: ${colors.LAVENDER.pastelLavender};
        border: 1px solid ${colors.MINT.softMint};
    `,
};

const SizeCSS = {
    small: css`
        width: ${sizes.textarea.smail.width};
        height: ${sizes.textarea.smail.height};
        font-size: ${sizes.fontSize.small};
    `,
    medium: css`
        width: ${sizes.textarea.medium.width};
        height: ${sizes.textarea.medium.height};
        font-size: ${sizes.fontSize.small};
    `,
    large: css`
        width: ${sizes.textarea.large.width};
        height: ${sizes.textarea.large.height};
        font-size: ${sizes.fontSize.small};
    `,
};

export const STextArea = styled.textarea`
    border-radius: 4px;
    ${({ theme }) => ColorCSS[theme]}
    ${({ size }) => SizeCSS[size]}
`;

export const SError = {
    color: `${colors.SYSTEM.error}`,
};
