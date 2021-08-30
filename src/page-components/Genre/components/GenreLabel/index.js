import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import Paragraph from 'components/Typography/Paragraph';
import spacing from 'styles/helpers/spacing';

const StyledLabel = styled(Box)`
  display: inline-block;
  text-transform: uppercase;
  background-color: ${props => props.theme.dark};
  border-radius: 2px;
`;

const GenreLabel = () => (
  <StyledLabel mt={[80, spacing.m, spacing.m]} mb={[spacing.s, spacing.s, spacing.m]} px={spacing.xs}>
    <Paragraph text="music genre" variant="s" />
  </StyledLabel>
);

export default GenreLabel;
