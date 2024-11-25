import styled from "styled-components";
import layout from "../../constants/design-token/layout";
import { colors } from "../../constants/design-token/color";

const Box = ({ children, backgroundColor }) => {
    return (
        <Wrapper $backgroundColor={backgroundColor}>
            <Container>{children}</Container>
        </Wrapper>
    );
};
export default Box;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
        props.$backgroundColor || colors.SYSTEM.default};
`;

const Container = styled.div`
    width: ${layout.container};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
