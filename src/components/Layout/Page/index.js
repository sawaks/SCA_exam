import Footer from 'components/Footer';
import { useRouter } from 'next/router';
import { Box, Container } from 'components/Grid';
import FixContent from 'components/Layout/FixContentBlock';
import NavBar from 'components/NavBar';
import { bool, func, node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import zIndex from 'styles/helpers/zIndex';
import spacing from 'styles/helpers/spacing';

const StyledBg = styled(Box)`
   position: relative;
   top: -49px;

  ${screen.sm} {
   top: -100px;
  }

   ${screen.lg} {
    top: -138px;
  }
`;

const StyledPage = styled.div`
  color: ${props => props.theme.light};
  padding-bottom: ${props => (props.withAudio ? '80px' : '0px')};
`;

const HeaderBar = styled(Box)`
  z-index: ${zIndex.headerBar};
  width: 100%;
  position: relative;

  ${screen.md} {
    z-index: 13;
  }
`;

const fullWidthContainer = ({ fullWidthBg = null, fullWidthContent = null, children, ...props }) => {
  if (fullWidthBg) {
    return (
      <StyledBg>
        {fullWidthBg({ children, ...props })}
      </StyledBg>
    );
  }

  if (fullWidthContent) {
    return (
      <>
        <StyledBg>
          { fullWidthContent }
        </StyledBg>
        {children}
      </>
    );
  }

  return (
    <div>
      { children }
    </div>
  );
};

fullWidthContainer.propTypes = {
  fullWidthBg: func,
  fullWidthContent: node,
  children: node,
};

fullWidthContainer.defaultProps = {
  fullWidthBg: null,
  fullWidthContent: null,
  children: null,
};

/**
 * Page
 * @description A helper function to add components to a page based on the page requirements.
 */
function Page({ children, withAudio, withNav, withNavDesktopOnly, withFooter, fullWidthBg, fullWidthContent, ...props }) {
  const router = useRouter();
  const [isAppLink, setIsAppLink] = useState(false);
  const playerOverlayVisible = useSelector(state => state.playerOverlay.visible, shallowEqual);

  const checkAsPath = (queryValue) => {
    if (queryValue && queryValue[1] === 'appLink') {
      setIsAppLink(true);
    }
  };

  useEffect(() => {
    if (router?.query?.source === 'appLink') {
      setIsAppLink(true);
    } else {
      const queryKey = 'source';
      const queryValue = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));
      checkAsPath(queryValue);
    }
  }, []);

  return (
    <FixContent playerOverlayVisible={playerOverlayVisible}>
      <StyledPage withAudio={withAudio}>
        <HeaderBar flex="0 1 auto" mb={[spacing.l, spacing.none, spacing.l]}>
          <NavBar />
        </HeaderBar>

        {fullWidthContainer({ fullWidthBg, fullWidthContent, children, ...props })}

        {withFooter && !isAppLink && (
          <Container>
            <Footer />
          </Container>
        )}
      </StyledPage>
    </FixContent>
  );
}

Page.propTypes = {
  children: node.isRequired,
  withAudio: bool,
  withNav: bool,
  withFooter: bool,
  withNavDesktopOnly: bool,
  fullWidthBg: func,
  fullWidthContent: node,
};

Page.defaultProps = {
  withAudio: false,
  withNav: false,
  withNavDesktopOnly: false,
  withFooter: false,
  fullWidthBg: null,
  fullWidthContent: null,
};

export default Page;
