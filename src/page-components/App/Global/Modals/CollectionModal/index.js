import React, { useState, useEffect } from 'react';
import Button from 'components/Button';
import styled from 'styled-components';
import { string } from 'prop-types';
import { Box, Flex } from 'components/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { closeCollectionModal } from 'store/actions/userInteractions';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import browserDetect from 'browser-detect';
import { getOS } from 'utilities/helpers/getDeviceInfo';
import { OS_TYPE } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import ModalWrapper from '../ModalWrapper';

const StyledWrapper = styled(Flex)`
  border: 1px solid ${props => props.theme.secondaryBorder};
  border-radius: 0 0 12px 12px;
  padding: ${spacing.m};
  background: ${props => props.theme.dark};
  position: relative;
`;

const StyledNoThanksBtn = styled(Button)`
  padding: 0 ${spacing.m};
  margin: ${spacing.m} 0;
  &:hover {
    background-color: ${props => props.theme.light} !important;
    color: ${props => props.theme.dark} !important;
    border: inherit !important;
  }
  ${screen.md} {
    padding: 0 21px;
  }
`;

const Google = styled(Flex)`
  margin: auto 0;
  ${screen.sm} {
    padding: 0 ${spacing.m} 0 0;
  }
  ${screen.xl} {
    padding: 0 25px 0 2%;
  }
`;

const Apple = styled(Flex)`
  margin: auto 0;
  ${screen.xl} {
    padding: 0 ${spacing.m} 0 0;
  }
`;

const HuaweiIcon = styled.div`
  width: 120px;
  height: 40px;
  background: url('/images/huawei-black-logo.png') no-repeat;
  background-size: 120px 40px;
`;

const CollectionModal = React.memo(() => {
  const dispatch = useDispatch();
  const displayNewWebInfoModal = useSelector(
    ({ userInteractions }) => userInteractions.displayCollectionModal
  );

  const handleCloseModal = () => {
    dispatch(closeCollectionModal());
  };

  const handleNoThanks = () => {
    dispatch(closeCollectionModal());
  };

  const browser = browserDetect(window.navigator.userAgent);
  const isOS = browser.os.includes('OS');

  const [os, setOs] = useState('');

  useEffect(() => {
    setOs(getOS());
  }, []);

  const huaweiLink = 'https://appgallery.cloud.huawei.com/ag/n/app/C104172499?channelId=LiSTNR&amp;';
  const huaweiReferrer = 'referrer=Huawei+App+Gallery&amp;id=6a227f711793427e951d3ce8c0a76eea&amp;s=B13ABC870B7526FD95B1617B0EEDDCC0AB0A4437B8ABA3C7026DD7AF5B7AC4F4&amp;detailType=0&amp;v';

  const StyledHeader = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-radius: 12px 12px 0 0;
    background: url(${props => props.heroImage}) no-repeat center;
    background-size: cover;
    height: 214px;
    padding: ${spacing.m};

    ${screen.sm}{
      border-radius: 12px 12px 0 0;
      background-size: 102% auto;
      height: 220px;
    }

    ${screen.md}{
      background-size: cover;
    }
`;

  return (
    <ModalWrapper
      isOpen={displayNewWebInfoModal}
      handleClose={handleCloseModal}
    >
      <StyledHeader heroImage="/images/hero-bottom.png">
        <Box width={[1, '80%']}>
          <Header
            as="h1"
            variant="xl"
            mb="m"
            text="Download the app to listen to this collection"
          />
        </Box>
      </StyledHeader>
      <StyledWrapper flexDirection="column" justifyContent="center">
        <Header
          as="h2"
          variant="l"
          mb="m"
          text="Enjoy the full LiSTNR library FREE as well as these features:"
        />
        <Paragraph
          variant="m"
          text="• A daily feed of new podcasts from your faves"
          transparent
        />
        <Paragraph
          variant="m"
          text="• Get notified when when new episodes are released"
          transparent
        />
        <Paragraph
          variant="m"
          mb="m"
          text="• Access your account between web and app"
          transparent
        />
        <Paragraph
          variant="m"
          text="Download the app by tapping the links below"
          transparent
        />
        <Flex mt={spacing.xl} justifyContent="space-between">
          {((browser.mobile && !isOS) || !browser.mobile)
            && (
            <Google>
              <a href="https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&amp;hl=en_AU">
                <img
                  src="/images/google-play.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                />
              </a>
            </Google>
            )}
          {((browser.mobile && isOS) || !browser.mobile)
            && (
            <Apple>
              <a href="https://apps.apple.com/au/app/podcastone-australia/id1462845202">
                <img
                  src="/images/app-store.png"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </a>
            </Apple>
            )}
          {os === OS_TYPE.HUAWEI && (
            <Box onClick={() => addToDataLayer({ event: gtm.hauweiStoreDownloadHomepageStartListening })}>
              <a target="_blank" rel="noreferrer" href={huaweiLink + huaweiReferrer}>
                <HuaweiIcon />
              </a>
            </Box>
          )}
        </Flex>
        <StyledNoThanksBtn
          variant="quinary"
          text="No thanks"
          maxWidthDesktop="120px"
          onClick={handleNoThanks}
        />

      </StyledWrapper>
    </ModalWrapper>
  );
});

CollectionModal.propTypes = {
  heroImage: string,
};

CollectionModal.defaultProps = {
  heroImage: null,
};

export default CollectionModal;
