import browserDetect from 'browser-detect';
import { Box } from '@rebass/grid';
import { Flex } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { getOS } from 'utilities/helpers/getDeviceInfo';
import { OS_TYPE } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const GooglePlay = () => (
  <Google>
    <a href="https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&amp;hl=en_AU">
      <img
        src="/images/google-play.png"
        alt="Get it on Google Play"
        width={162}
        height={48}
      />
    </a>
  </Google>
);

const AppleStore = () => (
  <Apple>
    <a href="https://apps.apple.com/au/app/podcastone-australia/id1462845202">
      <img
        src="/images/app-store.png"
        alt="Download on the App Store"
        width={144}
        height={48}
      />
    </a>
  </Apple>
);

const DownloadBanner = () => {
  const [isMobile, setIsMobile] = useState();
  const [linkUrl, setLinkUrl] = useState();
  const [os, setOs] = useState('');

  useEffect(() => {
    setOs(getOS());
  }, []);

  useEffect(() => {
    const browser = browserDetect(window.navigator.userAgent);
    if (browser.mobile) {
      const linkURL = browser.os.includes('OS')
        ? 'https://apps.apple.com/au/app/podcastone-australia/id1462845202'
        : 'https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&hl=en_AU';
      setLinkUrl(linkURL);
      setIsMobile(true);
    }
  }, []);

  const handleClick = () => {
    if (isMobile) {
      window.location.href = linkUrl;
    }
  };

  const huaweiLink = 'https://appgallery.cloud.huawei.com/ag/n/app/C104172499?channelId=LiSTNR&amp;';
  const huaweiReferrer = 'referrer=Huawei+App+Gallery&amp;id=6a227f711793427e951d3ce8c0a76eea&amp;s=B13ABC870B7526FD95B1617B0EEDDCC0AB0A4437B8ABA3C7026DD7AF5B7AC4F4&amp;detailType=0&amp;v';

  return (
    <>
      <Banner>
        <Left onClick={() => handleClick()}>
          <AppLogo>
            <img
              src="/images/new-listnr-logo.png"
              width={100}
              height={100}
              alt="Listnr"
            />
          </AppLogo>
          <TextWrapper>
            <Header as="h3" variant="m" text="Download the app to get the full experience" />
            <Paragraph variant="m" text="Get a fully curated daily feed based on your favourites, access to curated collections, preview every show, and much more." />
            <MobileDesktopHide>
              <GooglePlay />
              <AppleStore />
              {os === OS_TYPE.HUAWEI && (
                <Box onClick={() => addToDataLayer({ event: gtm.hauweiStoreDownloadHomepageStartListening })}>
                  <a target="_blank" rel="noreferrer" href={huaweiLink + huaweiReferrer}>
                    <HuaweiIcon />
                  </a>
                </Box>
              )}
            </MobileDesktopHide>
          </TextWrapper>
        </Left>
        <Right>
          <GooglePlay />
          <AppleStore />
        </Right>
      </Banner>
    </>
  );
};

const Banner = styled(Flex)`
  width: 100%;
  cursor: pointer;
  background: ${props => props.theme.backgroundLight};
  border: solid 1px rgba(255,255,255,0.16);
  border-radius: 4px;
  flex-direction: row;
  margin-bottom: ${spacing.l};
  ${screen.md} {
    background: url('/images/listnr-phone.png') no-repeat 95% bottom ${props => props.theme.backgroundLight};
    background-size: 196px 141px;
  }
  ${screen.xl} {
    background-position: 65% bottom;
    margin-bottom: ${spacing.xl};
    background-size: 208.25px 149.6px;
  }
`;

const AppLogo = styled.div`
  margin: ${spacing.m};
  align-self: center;
  width: 150px;
  ${screen.md} {
    margin: 36px 2.5%;
  }
`;

const TextWrapper = styled.div`
  flex-direction: column;
  margin: auto 0;
  padding: ${spacing.m} ${spacing.m} ${spacing.m} 0;
  width: 100%;
  p {
    margin-top: ${spacing.m};
    opacity: 0.7
  }
  ${screen.md} {
    flex-direction: row;
    padding: ${spacing.l} ${spacing.l} ${spacing.m} 0;
    width: 100%;
  }
  ${screen.lg} {
    padding: ${spacing.m} ${spacing.xl} ${spacing.m} 0;
  }
`;

const Google = styled(Flex)`
  margin: auto 0;
  ${screen.sm} {
    padding: 0 ${spacing.m} 0 0;
  }
`;

const Apple = styled(Flex)`
  margin: auto 0;
  ${screen.xl} {
    padding: 0 ${spacing.m} 0 0;
  }
`;

const MobileDesktopHide = styled(Flex)`
  margin: ${spacing.m} 0 0 0;
  display: none;
  ${screen.sm} {
    display: flex;
  }
  ${screen.xl} {
    display: none;
  }
`;

const Left = styled(Flex)`
  width: 100%;
  ${screen.sm} {
    margin: 0 2%;
  }
  ${screen.md} {
    width: 75%;
  }
  ${screen.xl} {
    width: 55%;
  }
`;

const Right = styled(Flex)`
  width: 40%;
  display: none;
  justify-content: flex-end;
  margin: 0 ${spacing.l} 0 0;
  ${screen.xl} {
    display: flex;
  }
`;

const HuaweiIcon = styled.div`
  width: 160px;
  height: 48px;
  background: url('/images/huawei-black-logo.png') no-repeat;
  background-size: 160px 48px;
  ${screen.md} {
    display: none;
  }
`;

export default DownloadBanner;
