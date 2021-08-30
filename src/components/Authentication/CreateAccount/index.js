import Button from 'components/Button';
import { Box, Flex } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import Link from 'next/link';
import { func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { getOS } from 'utilities/helpers/getDeviceInfo';
import { OS_TYPE } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import OptionsButton from '../OptionsButton';
import AuthenticateWrapper from '../AuthenticateWrapper';

const clickHandler = (event) => {
  if (event) {
    addToDataLayer({
      event,
    });
  }
};

export const Google = ({ clickEvent }) => (
  <a onClick={() => clickHandler(clickEvent)} href="https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&amp;hl=en_AU" target="_blank" rel="noreferrer">
    <img
      src="/images/google-play.png"
      alt="google-play"
    />
  </a>
);

export const Apple = ({ clickEvent }) => (
  <a onClick={() => clickHandler(clickEvent)} href="https://apps.apple.com/au/app/podcastone-australia/id1462845202" target="_blank" rel="noreferrer">
    <img
      src="/images/app-store.png"
      alt="app-store"
    />
  </a>
);

function CreateAccount({ handleNoThanks }) {
  const [isAndroid, setAndroid] = useState();
  const device = useSelector(state => state.device, shallowEqual);
  const [os, setOs] = useState('');

  useEffect(() => {
    setOs(getOS());
  }, []);

  useEffect(() => {
    if (device.browser.mobile) {
      if (device.browser.name === 'chrome') {
        setAndroid(true);
      } else {
        setAndroid(false);
      }
    }
  }, []);

  const huaweiLink = 'https://appgallery.cloud.huawei.com/ag/n/app/C104172499?channelId=LiSTNR&amp;';
  const huaweiReferrer = 'referrer=Huawei+App+Gallery&amp;id=6a227f711793427e951d3ce8c0a76eea&amp;s=B13ABC870B7526FD95B1617B0EEDDCC0AB0A4437B8ABA3C7026DD7AF5B7AC4F4&amp;detailType=0&amp;v';

  const AppIcon = () => {
    if (device.browser.mobile) {
      if (isAndroid) {
        return (
          <StyledIcon>
            <Google />
          </StyledIcon>
        );
      }
      return (
        <>
          {os !== OS_TYPE.HUAWEI && (
          <StyledIcon>
            <Apple />
          </StyledIcon>
          )}
          {os === OS_TYPE.HUAWEI && (
          <Box onClick={() => addToDataLayer({ event: gtm.hauweiStoreDownloadHomepageStartListening })}>
            <a target="_blank" rel="noreferrer" href={huaweiLink + huaweiReferrer}>
              <HuaweiIcon />
            </a>
          </Box>
          )}
        </>
      );
    }
    return (
      <>
        <StyledIcon>
          <Google />
        </StyledIcon>
        {os !== OS_TYPE.HUAWEI && (
          <StyledIcon>
            <Apple />
          </StyledIcon>
        )}
        {os === OS_TYPE.HUAWEI && (
          <Box onClick={() => addToDataLayer({ event: gtm.hauweiStoreDownloadHomepageStartListening })}>
            <a target="_blank" rel="noreferrer" href={huaweiLink + huaweiReferrer}>
              <HuaweiIcon />
            </a>
          </Box>
        )}
      </>
    );
  };
  const NoThanks = (
    <StyledNoThanksBtn
      variant="quinary"
      text="No thanks"
      minWidthMobile="0"
      minWidthDesktop="0"
      onClick={handleNoThanks}
      data-test="NoThanksBtn"
    />
  );
  const CreateAccountButton = (
    <Link href="/login">
      <a>
        <Button
          variant="primary"
          text="Sign Up or Login"
          style={{ width: '100%' }}
        />
      </a>
    </Link>
  );

  const ModalText = () => (
    <>
      <Header as="h2" variant="l" mb="m" text="Enjoy the full LiSTNR library for FREE, as well as these great features:" />
      <Paragraph variant="m" text="• A daily feed of the latest podcast from your faves" transparent />
      <Paragraph variant="m" text="• Get notified when new episodes are released" transparent />
      <Paragraph variant="m" mb="m" text="• Access your feed on many devices" transparent />
      <Paragraph variant="m" text="For the best listening experience, download the app." transparent />
    </>
  );

  const heroImages = '/images/login-hero.png';

  return (
    <AuthenticateWrapper
      smallText
      heroText="Create a LiSTNR account today"
      heroImages={{
        mobile: heroImages,
        tablet: heroImages,
        desktop: heroImages,
      }}
      button={<OptionsButton option1={NoThanks} option2={CreateAccountButton} />}
      withRoundedTopBorderMobile
    >
      <Box pb={spacing.xxl}>
        <ModalText />
        <AppIconWrapper>
          <AppIcon />
        </AppIconWrapper>
      </Box>
    </AuthenticateWrapper>
  );
}

const StyledNoThanksBtn = styled(Button)`
  padding: 0 ${spacing.m};
  ${screen.md}{
    padding: 0 21px;
  }
`;
const AppIconWrapper = styled(Flex)`
  margin: ${spacing.l} 0;
`;

const StyledIcon = styled.div`
  border-radius: ${spacing.s};
  margin-right: ${spacing.m};
  img{
    width: auto;
    height: 40px;
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

CreateAccount.propTypes = {
  handleNoThanks: func.isRequired,
};

Google.propTypes = {
  clickEvent: string,
};

Google.defaultProps = {
  clickEvent: null,
};

Apple.propTypes = {
  clickEvent: string,
};

Apple.defaultProps = {
  clickEvent: null,
};

export default CreateAccount;
