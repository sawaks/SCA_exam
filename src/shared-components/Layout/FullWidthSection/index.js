import { bool, node, oneOfType, string } from 'prop-types';
import React from 'react';
import { Container } from 'shared-components/Grid';
import Section from 'shared-components/Layout/Section';

const FullWidthSection = ({ fullWidth = null, children }) => {
  if (fullWidth) {
    return (
      <div>
        { children }
      </div>
    );
  }

  return (
    <Container>
      <Section>
        { children }
      </Section>
    </Container>
  );
};

FullWidthSection.propTypes = {
  fullWidth: oneOfType([string, bool]).isRequired,
  children: node.isRequired,
};

export default FullWidthSection;
