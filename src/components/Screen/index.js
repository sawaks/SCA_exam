import styled from 'styled-components';
import screen from 'src/styling/screen';

const Mobile = styled.div`
  display: block;
  width: 100%;
  ${screen.tablet} {
    display: none;
  }
`;

const Desktop = styled.div`
  display: none;
  width: ${props => (props.width || '100%')};
  ${screen.tablet} {
    display: block;
  }
`;

export { Mobile, Desktop };
