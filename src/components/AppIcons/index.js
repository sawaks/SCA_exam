import { Box } from '@rebass/grid';
import AppStoreIcon from 'components/Icons/app-store.svg';
import GooglePlayIcon from 'components/Icons/google-play.svg';
import React, { useEffect, useState } from 'react';
import spacing from 'styles/helpers/spacing';
import { OS_TYPE } from 'utilities/constants';
import { getOS } from 'utilities/helpers/getDeviceInfo';

function AppIcons() {
  const [os, setOs] = useState('');

  useEffect(() => {
    setOs(getOS());
  }, []);

  return (
    <>
      {os !== OS_TYPE.ANDROID && os !== OS_TYPE.HUAWEI && (
        <Box mr={spacing.s}>
          <a target="_blank" rel="noreferrer" href="https://apps.apple.com/au/app/podcastone-australia/id1462845202">
            <AppStoreIcon />
          </a>
        </Box>
      )}
      {os !== OS_TYPE.IOS && (
        <Box mr={spacing.s}>
          <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&amp;hl=en_AU">
            <GooglePlayIcon />
          </a>
        </Box>
      )}
    </>
  );
}

export default AppIcons;
