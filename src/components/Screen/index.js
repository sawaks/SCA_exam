import styled from 'styled-components';
import screen from 'styles/helpers/media';

const Mobile = styled.div`
  display: block;
  width: 100%;
  ${screen.md} {
    display: none;
  }
`;

const Desktop = styled.div`
  display: none;
  width: ${props => (props.width || '100%')};
  ${screen.md} {
    display: block;
  }
`;

export { Mobile, Desktop };
