import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from 'reflexbox';
import { Container, Flex } from 'components/Grid';
import Divider from 'components/Divider';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import ArrowDownIcon from 'components/Icons/open-player.svg';
import Paragraph from 'components/Typography/Paragraph';
import { Apple, Google } from 'components/Authentication/CreateAccount';
import { getOS } from 'utilities/helpers/getDeviceInfo';
import PropTypes from 'prop-types';
import { Desktop, Mobile } from 'components/Screen';
import { OS_TYPE } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const DownloadBanner = ({ description }) => {
  const downloadBanner = useRef(null);

  const scrollToNext = () => {
    const rect = downloadBanner.current.getBoundingClientRect();
    const y = rect.bottom + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const [os, setOs] = useState('');

  useEffect(() => {
    setOs(getOS());
  }, []);

  const huaweiLink = 'https://appgallery.cloud.huawei.com/ag/n/app/C104172499?channelId=LiSTNR&amp;';
  const huaweiReferrer = 'referrer=Huawei+App+Gallery&amp;id=6a227f711793427e951d3ce8c0a76eea&amp;s=B13ABC870B7526FD95B1617B0EEDDCC0AB0A4437B8ABA3C7026DD7AF5B7AC4F4&amp;detailType=0&amp;v';

  return (
    <StyleDownloadBanner ref={downloadBanner}>
      <Container>
        <Box>
          <Divider />
        </Box>
        <Desktop>
          <Flex justifyContent="space-between" alignItems="center" pt={spacing.xl} pb="67px">
            <StyledDownloadIcon onClick={() => scrollToNext()}>
              <ArrowDownIcon />
            </StyledDownloadIcon>
            <StyledDownloadText>
              <Paragraph variant="l" text={description} />
            </StyledDownloadText>
            <StyledAppIcons justifyContent="center" alignItems="center">
              <Apple clickEvent={gtm.appStoreDownloadHomepageCarousel} />
              <Google clickEvent={gtm.googlePlayDownloadHomepageCarousel} />
            </StyledAppIcons>
          </Flex>
        </Desktop>
        <Mobile>
          <Flex flexDirection="column" justifyContent="space-between" alignItems="center" pb="30px">
            <StyledDownloadText pb={spacing.l} pt={spacing.m}>
              <Paragraph variant="l" text={description} />
            </StyledDownloadText>
            <StyledAppIcons justifyContent="center" alignItems="center">
              {os !== OS_TYPE.HUAWEI && (
              <Apple clickEvent={gtm.appStoreDownloadHomepageCarousel} />
              )}
              <Google clickEvent={gtm.googlePlayDownloadHomepageCarousel} />
              {os === OS_TYPE.HUAWEI && (
                <Box onClick={() => addToDataLayer({ event: gtm.hauweiStoreDownloadHomepageStartListening })}>
                  <a target="_blank" rel="noreferrer" href={huaweiLink + huaweiReferrer}>
                    <HuaweiIcon />
                  </a>
                </Box>
              )}
            </StyledAppIcons>
          </Flex>
        </Mobile>
      </Container>
    </StyleDownloadBanner>
  );
};

const StyleDownloadBanner = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
`;

const StyledDownloadIcon = styled(Box)`
  width: 46px;
  height: 46px;
  border-radius: 100%;
  transform: rotate(180deg);
  cursor: pointer;
  path {
    fill:${props => props.theme.milkPunch};
  }
`;

const StyledDownloadText = styled(Box)`
  p {
      text-align: center;
  }
`;

const StyledAppIcons = styled(Box)`
  display: flex;
  width: 100%;
  img {
    height: 40px;
    margin: 0 ${spacing.s};
  }

  ${screen.md} {
    width: initial;
  }
`;

const HuaweiIcon = styled.div`
  width: 133px;
  height: 40px;
  background: url('/images/huawei-black-logo.png') no-repeat;
  background-size: 133px 40px;
  ${screen.md} {
    display: none;
  }
`;

DownloadBanner.propTypes = {
  description: PropTypes.string,
};

DownloadBanner.defaultProps = {
  description: '',
};

export default DownloadBanner;
