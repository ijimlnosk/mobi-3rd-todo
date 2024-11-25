import styled, { css } from "styled-components";
import { colors } from "../constants/design-token/color";
import { sizes } from "../constants/design-token/size";

export const ColorCss = {
    springTheme: {
        css: css`
            color: ${colors.GRAY.nearBlackGray};
            background-color: ${colors.LAVENDER.lightLavender};
            border: 1px solid ${colors.GREEN.paleGreen};
        `,
        activeBackground: `${colors.MINT.paleMint}cc`,
    },
    blossomTheme: {
        css: css`
            color: ${colors.GRAY.nearBlackGray};
            background-color: ${colors.GRAY.veryLightGray};
            border: 1px solid ${colors.PINK.lightPink};
        `,
        activeBackground: `${colors.LAVENDER.pastelLavender}cc`,
    },
    morningDewTheme: {
        css: css`
            color: ${colors.GRAY.nearBlackGray};
            background-color: ${colors.GREEN.lightGreen};
            border: 1px solid ${colors.BLUE.pastelBlue};
        `,
        activeBackground: `${colors.GREEN.springGreen}cc`,
    },
};

const SizeCss = {
    xbtn: css`
        width: ${sizes.button.xbtn.width};
        height: ${sizes.button.xbtn.height};
        font-size: ${sizes.fontSize.small};
    `,
    xsmall: css`
        width: ${sizes.button.xsmall.width};
        height: ${sizes.button.xsmall.height};
        font-size: ${sizes.fontSize.small};
    `,
    small: css`
        width: ${sizes.button.small.width};
        height: ${sizes.button.small.height};
        font-size: ${sizes.fontSize.small};
    `,
    medium: css`
        width: ${sizes.button.medium.width};
        height: ${sizes.button.medium.height};
        font-size: ${sizes.fontSize.medium};
    `,
    large: css`
        width: ${sizes.button.large.width};
        height: ${sizes.button.large.height};
        font-size: ${sizes.fontSize.large};
    `,
};

export const SButton = styled.button`
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme }) => ColorCss[theme]?.css}
    ${({ size }) => SizeCss[size]}

    &:active {
        transform: scale(0.98);
        background-color: ${({ theme }) => ColorCss[theme]?.activeBackground};
    }
    &:hover {
        background-color: ${colors.GRAY.mediumGray};
    }
`;
