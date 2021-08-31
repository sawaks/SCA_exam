import Footer from 'shared-components/Footer';
import { Box, Container } from 'shared-components/Grid';
import NavBar from 'shared-components/NavBar';
import { bool, string, node } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'src/styling/screen';
import zIndex from 'src/styling/zIndex';
import spacing from 'src/styling/spacing';
import { Flex } from '@rebass/grid';
import addNavbarHeight from '../../../styling/add-navbar-height';

const StyledBg = styled(Box)`
   position: relative;
   top: -49px;

  ${screen.mobile} {
   top: -100px;
  }

   ${screen.laptop} {
    top: -138px;
  }
`;

const StyledPage = styled.div`
  color: ${props => props.theme.light};
  padding-bottom: 0;
`;

const HeaderBar = styled(Box)`
  z-index: ${zIndex.headerBar};
  width: 100%;
  position: relative;

  ${screen.tablet} {
    z-index: 13;
  }
`;

const StyledWrapper = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const StyledChildren = styled(Box)`
  position: relative;
  ${screen.mobile} {
    padding-top: 120px;
  }
  ${addNavbarHeight('padding-top', [20, 0, 46])};
`;

const StyledBackground = styled(Flex)`
   position: absolute;
   background: ${props => (props.backgroundImageUrl ? `url(${props.backgroundImageUrl})` : props.backgroundColor)} no-repeat center;
   background-size: cover;
   width: 102%;
   filter: blur(3px);
   ${addNavbarHeight('height', [290, 390, 593])};
`;

const StyledBackgroundGradient = styled(Box)`
   position: absolute;
   width: inherit;
   height: inherit;
   background: ${props => props.theme.backgroundGradient};
`;

/**
 * Page
 * @description A helper function to add components to a page based on the page requirements.
 */
function Page({ children, withFooter, backgroundColor, backgroundImageUrl }) {
  return (
    <StyledPage>
      <HeaderBar flex="0 1 auto" mb={[spacing.l, spacing.none, spacing.l]}>
        <NavBar />
      </HeaderBar>
      <StyledBg>
        <StyledWrapper>
          <StyledBackground backgroundColor={backgroundColor} backgroundImageUrl={backgroundImageUrl} alignItems="center" justifyContent="center">
            <StyledBackgroundGradient />
          </StyledBackground>
          <StyledChildren>
            {children}
          </StyledChildren>
        </StyledWrapper>
      </StyledBg>

      {withFooter && (
      <Container>
        <Footer />
      </Container>
      )}
    </StyledPage>
  );
}

Page.propTypes = {
  backgroundColor: string,
  backgroundImageUrl: string,
  children: node.isRequired,
  withFooter: bool,
};

Page.defaultProps = {
  backgroundColor: null,
  backgroundImageUrl: null,
  withFooter: false,
};

export default Page;
