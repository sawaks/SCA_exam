import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import { Flex, Box } from 'reflexbox';
import browserDetect from 'browser-detect';
import { getOS } from 'utilities/helpers/getDeviceInfo';
import { OS_TYPE } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const DownloadLogosAnimated = () => {
  const [isMobile, setIsMobile] = useState();
  const [isOS, setIsOS] = useState();
  const [os, setOs] = useState('');

  useEffect(() => {
    setOs(getOS());
  }, []);

  useEffect(() => {
    const browser = browserDetect(window.navigator.userAgent);
    if (browser.mobile) {
      setIsMobile(true);
      setIsOS(browser.os.includes('OS'));
    }
  }, []);

  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);

  const { scrollY } = useViewportScroll();
  const opacticyAnim = useTransform(scrollY, [0, elementTop - 900, elementTop - 850], [0, 0, 1]);
  const yAnim = useTransform(scrollY, [0, elementTop - 900, elementTop - 850], [50, 50, 0]);

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);

  const huaweiLink = 'https://appgallery.cloud.huawei.com/ag/n/app/C104172499?channelId=LiSTNR&amp;';
  const huaweiReferrer = 'referrer=Huawei+App+Gallery&amp;id=6a227f711793427e951d3ce8c0a76eea&amp;s=B13ABC870B7526FD95B1617B0EEDDCC0AB0A4437B8ABA3C7026DD7AF5B7AC4F4&amp;detailType=0&amp;v';

  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      style={{ y: yAnim, opacity: opacticyAnim }}
      ref={ref}
    >
      <Flex flexWrap="wrap">
        {isOS && isMobile
            && (
              <Download onClick={() => addToDataLayer({ event: gtm.appStoreDownloadHomepageFeature })}>
                <a target="_blank" rel="noreferrer" href="https://apps.apple.com/au/app/podcastone-australia/id1462845202">
                  <img
                    src="/images/app-store.png"
                    alt="app-store"
                    width={144}
                    height={48}
                  />
                </a>
              </Download>
            )}
        {!isOS && isMobile
            && (
            <Download onClick={() => addToDataLayer({ event: gtm.googlePlayDownloadHomepageFeature })}>
              <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&amp;hl=en_AU">
                <img
                  src="/images/google-play.png"
                  alt="google-play"
                  width={162}
                  height={48}
                />
              </a>
            </Download>
            )
          }
        {os === OS_TYPE.HUAWEI && isMobile && (
          <Box onClick={() => addToDataLayer({ event: gtm.hauweiStoreDownloadHomepageStartListening })}>
            <a target="_blank" rel="noreferrer" href={huaweiLink + huaweiReferrer}>
              <HuaweiIcon />
            </a>
          </Box>
        )}
        {!isMobile
        && (
          <>
            <Download onClick={() => addToDataLayer({ event: gtm.appStoreDownloadHomepageFeature })}>
              <a target="_blank" rel="noreferrer" href="https://apps.apple.com/au/app/podcastone-australia/id1462845202">
                <img
                  src="/images/app-store.png"
                  alt="app-store"
                  width={144}
                  height={48}
                />
              </a>
            </Download>
            <Download onClick={() => addToDataLayer({ event: gtm.googlePlayDownloadHomepageFeature })}>
              <a target="_blank" rel="noreferrer" href="https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia&amp;hl=en_AU">
                <img
                  src="/images/google-play.png"
                  alt="google-play"
                  width={162}
                  height={48}
                />
              </a>
            </Download>
          </>
        )
      }
      </Flex>
    </motion.div>
  );
};

const Download = styled(Box)`
  padding: 0 12px 12px 0;
  ${screen.md} {
    padding: 25px 12px 0 0;
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

export default DownloadLogosAnimated;
