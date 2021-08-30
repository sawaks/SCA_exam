import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paragraph from 'components/Typography/Paragraph';
import spacing from 'styles/helpers/spacing';
import Section from 'components/Section';
import screen from 'styles/helpers/media';
import rgba from 'styles/helpers/rgba';
import { Flex, Box } from 'components/Grid';

const StyledTitle = styled(Box)`
  padding-bottom: ${spacing.s};

  ${screen.md} {
    padding-bottom: ${spacing.m};
  }
`;

const StyledText = styled.div`
  color: ${props => rgba(props.theme.light, 0.6)};
`;

const StyledRow = styled(Flex)`
  padding-bottom: ${spacing.m};
`;

const Details = ({ details: { addr, state, postcode, suburb, country } }) => {
  const fullAddress = `${addr},<br />${suburb} ${state} ${postcode}, ${country}`;
  return (
    <Section top>
      <StyledRow>
        <StyledTitle width={[1, 1, 1 / 3]} mt={spacing.s}>
          <Paragraph variant="xl" text="Address:" />
        </StyledTitle>
        <Box width={[1, 1, 2 / 3]} mt={spacing.s}>
          <StyledText><Paragraph variant="l" dangerouslySetInnerHTML={{ __html: fullAddress }} /></StyledText>
        </Box>
      </StyledRow>
    </Section>
  );
};

Details.propTypes = {
  details: PropTypes.shape({
    addr: PropTypes.string,
    state: PropTypes.string,
    postcode: PropTypes.string,
    suburb: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};

export default Details;
