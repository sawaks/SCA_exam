import { Box } from '@rebass/grid';
import AppStoreIcon from 'shared-components/Icons/AppStore';
import GooglePlayIcon from 'shared-components/Icons/GooglePlay';
import React, { useEffect, useState } from 'react';
import spacing from 'src/styling/spacing';
import { OS_TYPE } from 'utilities/constants';
import { getOS } from 'utilities/helpers/device-info';

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
