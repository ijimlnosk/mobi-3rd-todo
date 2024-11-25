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
        padding: ${sizes.input.small.padding};
        font-size: ${sizes.fontSize.small};
    `,
    medium: css`
        padding: ${sizes.input.medium.padding};
        font-size: ${sizes.fontSize.medium};
    `,
    large: css`
        padding: ${sizes.input.large.padding};
        font-size: ${sizes.fontSize.large};
    `,
};

export const SInput = styled.input`
    border-radius: 4px;
    ${({ theme }) => ColorCSS[theme]}
    ${({ size }) => SizeCSS[size]}
`;

export const SError = {
    color: `${colors.SYSTEM.error}`,
};
