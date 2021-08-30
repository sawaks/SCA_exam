import styled from 'styled-components';

const BackgroundGradient = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.background};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

export default BackgroundGradient;
