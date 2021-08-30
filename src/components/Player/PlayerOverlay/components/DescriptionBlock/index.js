import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import rgba from 'styles/helpers/rgba';
import screen from 'styles/helpers/media';
import { Container } from 'components/Grid';

const StyledParagraph = styled.div`
  color: ${props => rgba(props.theme.LEGACY_secondary, 0.6)};
  font-size: 14px;

  ${screen.md} {
    font-size: 16px;
  }
`;

function DescriptionBar({ description }) {
  return (
    <Container>
      <StyledParagraph>
        {/* eslint-disable-next-line */}
        <div dangerouslySetInnerHTML={{ __html: description }} />
        {/* added this div to create more space below the descrition so that user can able to scroll up and down */}
        <div style={{ height: '350px' }} />
      </StyledParagraph>
    </Container>
  );
}

DescriptionBar.propTypes = {
  description: PropTypes.string.isRequired,
};

export default DescriptionBar;
