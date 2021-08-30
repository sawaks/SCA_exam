import React from 'react';
import { Container, Flex } from 'components/Grid';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import SearchBar from 'components/SearchBar';
import Headroom from 'react-headroom';
import BarLogo from '../BarLogo';

const StyledBarUI = styled(Flex)`
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: top 0.3s;

  ${screen.md} {
    font-size: 14px;
    letter-spacing: 1.2px;
  }
`;

function NavBar() {
  return (
    <Headroom>
      <Container>
        <nav>
          <StyledBarUI
            justifyContent="space-between"
            alignItems="center"
            pt={[spacing.s, spacing.l, spacing.l]}
            pb={[spacing.s, spacing.l, spacing.l]}
          >
            <Flex width={1}>
              <BarLogo />
              <SearchBar />
            </Flex>
          </StyledBarUI>
        </nav>
      </Container>
    </Headroom>
  );
}

export default NavBar;
