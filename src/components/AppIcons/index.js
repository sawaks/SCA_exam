import { Box } from '@rebass/grid';
import AppStoreIcon from 'components/Icons/app-store.svg';
import GooglePlayIcon from 'components/Icons/google-play.svg';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { OS_TYPE } from 'utilities/constants';
import { getOS } from 'utilities/helpers/getDeviceInfo';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

function AppIcons() {
  const [os, setOs] = useState('');

  useEffect(() => {
    setOs(getOS());
  }, []);

  const huaweiLink = 'https://appgallery.cloud.huawei.com/ag/n/app/C104172499?channelId=LiSTNR&amp;';
  const huaweiReferrer = 'referrer=Huawei+App+Gallery&amp;id=6a227f711793427e951d3ce8c0a76eea&amp;s=B13ABC870B7526FD95B1617B0EEDDCC0AB0A4437B8ABA3C7026DD7AF5B7AC4F4&amp;detailType=0&amp;v';

  return (
    <>
      {os !== OS_TYPE.ANDROID && os !== OS_TYPE.HUAWEI && (
        <Box mr={spacing.s} onClick={() => addToDataLayer({ event: gtm.appleStoreDownloadHomepageStartListening })}>
          <a target="_blank" rel="noreferrer" href="https://apps.apple.com/au/app/podcastone-australia/id1462845202">
            <AppStoreIcon />
          </a>
        </Box>
      )}
      {os !== OS_TYPE.IOS && (
        <Box mr={spacing.s} onClick={() => addToDataLayer({ event: gtm.googlePlayDownloadHomepageStartListening })}>
          <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&amp;hl=en_AU">
            <GooglePlayIcon />
          </a>
        </Box>
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

const HuaweiIcon = styled.div`
  width: 160px;
  height: 48px;
  background: url('/images/huawei-black-logo.png') no-repeat;
  background-size: 160px 48px;
  ${screen.md} {
    display: none;
  }
`;

export default AppIcons;
