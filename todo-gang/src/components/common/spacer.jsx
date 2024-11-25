import styled from "styled-components";

const Spacer = ({ width, height }) => {
    return <Space width={width} height={height}></Space>;
};
export default Spacer;

const Space = styled.div`
    width: ${({ width }) => width || "auto"};
    height: ${({ height }) => height || "auto"};
`;
