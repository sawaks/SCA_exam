import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'shared-components/Grid';
import rgba from 'src/styling/rgba';

const StyleDivider = styled(Flex)`
  width: inherit;
`;

const Hr = styled.hr`
  width: 100%;
  border: 0;
  margin: 0;
  border-top: ${props => `1px solid ${rgba(props.theme.light, props.opacity)}`};
`;

const StyleText = styled.div`
  padding: 0 6px;
  flex: 0 0 auto;
`;

function Divider(props) {
  if (props.text) {
    return (
      <StyleDivider justifyContent="center" alignItems="center">
        <Hr opacity={props.opacity} />
        <StyleText>
          {props.text}
        </StyleText>
        <Hr opacity={props.opacity} />
      </StyleDivider>
    );
  }
  return <Hr opacity={props.opacity} />;
}

Divider.propTypes = {
  text: PropTypes.string,
  opacity: PropTypes.number,
};

Divider.defaultProps = {
  text: '',
  opacity: 0.3,
};

export default Divider;
