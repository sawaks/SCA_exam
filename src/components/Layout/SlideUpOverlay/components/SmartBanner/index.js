import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Flex, Box } from 'components/Grid';
import Button from 'components/Button';
import styled from 'styled-components';
import Cookie from 'js-cookie';
import spacing from 'styles/helpers/spacing';
import Paragraph from 'components/Typography/Paragraph';

const { FIREBASE_APP_DYNAMICLINK_URL } = process.env;

const StyledWrapper = styled(Box)`
  width: 100%;
`;

const SmartBannerWrapper = styled(Flex)`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.whiteColor};
  height: 70px;
  padding: ${spacing.m};
  width: inherit;
`;

const SmartBannerImage = styled(Box)`
  img {
    width: 40px;
    height: 40px;
  }
`;

const StyledText = styled(Box)`
flex-grow: 1;
`;

const SmartBanner = () => {
  const [visible, setVisible] = useState(true);
  const { isMobile, isPWA } = useSelector(({ device: { browser, pwa } }) => ({
    isMobile: browser.mobile,
    isPWA: pwa,
  }), shallowEqual);

  useEffect(() => {
    const smartBannerCookie = Cookie.getJSON('SmartBannerCookie');
    if (smartBannerCookie) {
      setVisible(false);
    }
  }, []);

  const handleOnClick = () => {
    setVisible(false);
    Cookie.set('SmartBannerCookie', true, { expires: 1 });
  };

  if (isPWA || !isMobile) {
    return null;
  }

  return (
    <StyledWrapper display={visible ? 'inline-block' : 'none'}>
      <SmartBannerWrapper justifyContent="space-between" alignItems="center" onClick={handleOnClick}>
        <SmartBannerImage width="50px">
          <img
            src="/images/pconeDynamicLink.png"
            width={88}
            height={88}
            alt="Listnr"
          />
        </SmartBannerImage>
        <StyledText>
          <Paragraph variant="l" text="Get the app for the best" transparent />
          <Paragraph variant="l" text="listening experience" transparent />
        </StyledText>
        <Box>
          <Button
            as="a"
            text="Download"
            mobileText="Download"
            link={{ href: FIREBASE_APP_DYNAMICLINK_URL || '' }}
            target="_blank"
          />
        </Box>
      </SmartBannerWrapper>
    </StyledWrapper>
  );
};

export default SmartBanner;
