import React from 'react';
import styled from 'styled-components';
import Paragraph from 'components/Typography/Paragraph';
import { Flex } from 'components/Grid';
import spacing from 'styles/helpers/spacing';
import PropTypes from 'prop-types';

const StyledParagraph = styled(Flex)`
  padding: 0 ${spacing.l} ;
  width: 100%;
  min-height: 200px;
`;

function NoEpisodes({ type }) {
  return (
    <StyledParagraph justifyContent="center">
      <Paragraph variant="m" marginTop="s" text={`There are no more episodes available for this ${type}.`} transparent />
    </StyledParagraph>
  );
}

NoEpisodes.propTypes = {
  type: PropTypes.string,
};

NoEpisodes.defaultProps = {
  type: 'show',
};

export default NoEpisodes;
