import styled from "styled-components";
import { colors } from "../../constants/design-token/color";

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const onNavi = () => {
        navigate("/");
    };

    return (
        <Wrapper>
            <LogoBox>
                <a
                    href="https://github.com/ijimlnosk"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LogoImg src="https://i.ibb.co/82V9Y1K/image.webp" />
                </a>
            </LogoBox>
            <Title onClick={() => onNavi()}>Jinsol&rsquo;s Page</Title>
        </Wrapper>
    );
};
export default Header;

const Wrapper = styled.div`
    width: 100%;
    height: 80px;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    position: fixed;
    top: 0;
    border: 1px solid ${colors.GRAY.mediumDarkGray};
    background-color: ${colors.MINT.softMint};
    z-index: 999;
`;

const LogoBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImg = styled.img`
    width: 70px;
    height: 70px;
    border: 1px solid ${colors.BLUE.softBlue};
    border-radius: 50%;
`;

const Title = styled.h1`
    text-align: center;
    cursor: pointer;
`;
