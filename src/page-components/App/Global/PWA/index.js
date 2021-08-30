import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import styled from 'styled-components';
import { Box, Flex } from 'components/Grid/';
import CloseIcon from 'components/Icons/close.svg';
import PWAcon from 'components/Icons/listnr-logo.svg';
import Button from 'components/Button';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import zIndex from 'styles/helpers/zIndex';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import addPWAPrompt from './utilities/installPWAPrompt';

const PromptWrapper = styled(Flex)`
  position: fixed;
  left: 0;
  bottom: 72px;
  width: 100%;
  z-index: ${zIndex.miniPlayer};
`;

const StyledPrompt = styled(Box)`
  width: 96%;
  background-color: ${props => props.theme.LEGACY_secondary};
  color: ${props => props.theme.LEGACY_primaryText};
  border-radius: 6px;
`;

const StyledFlex = styled(Flex)`
  width: 100%;
  padding: ${spacing.s};
`;

const ItemBox = styled(Box)`
  margin-right: ${spacing.s};
  ${screen.md} {
      margin-right: ${spacing.l};
  }
`;

const StyledText = styled(Box)`
  margin-right: ${spacing.s};
  flex: 1;
`;

const StyledButton = styled(Box)`
  button {
    height: 30px;
    width: 75px;
    border-radius: 15px;
    padding: 0;
    line-height: inherit;
    min-width: inherit;
  }
`;

function PWAPrompt() {
  const [prompt, promptToInstall] = addPWAPrompt();
  const [visibility, setVisibility] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [PWAPromptCookie, setPWAPromptCookie] = useState(false);

  const { isDesktop } = useSelector(({ device: { browser } }) => ({
    isDesktop: !browser.mobile,
  }), shallowEqual);

  const onClosePrompt = () => {
    setVisibility(false);
    setUserInteracted(true);
    // Dont show message again until 7 days later.
    Cookie.set('PWAPromptCookie', true, { expires: 7 });
  };

  const onInstallApp = async () => {
    const userChoice = await promptToInstall();
    if (userChoice.outcome === 'accepted') {
      addToDataLayer({
        event: gtm.onPWAInstallButtonPress,
        platform_installed_on: userChoice.platform,
      });
    } else {
      addToDataLayer({
        event: gtm.onPWACloseButtonPress,
      });
    }
    onClosePrompt();
  };

  useEffect(() => {
    if (prompt && !userInteracted) {
      setVisibility(true);
    }
  }, [prompt]);

  useEffect(() => {
    const getPWAPromptCookie = Cookie.getJSON('PWAPromptCookie');
    if (getPWAPromptCookie) {
      setPWAPromptCookie(true);
    }
  }, []);

  if (PWAPromptCookie || isDesktop || !visibility) {
    return null;
  }

  return (
    <PromptWrapper justifyContent="center" alignItems="center">
      <StyledPrompt>
        <StyledFlex justifyContent="space-between" alignItems="center">
          <ItemBox onClick={onClosePrompt}>
            <CloseIcon />
          </ItemBox>
          <ItemBox>
            <PWAcon />
          </ItemBox>
          <StyledText>
            <Header as="h5" text="Install the app" />
            <Paragraph variant="l" text="Get our free app for the best listening experience" transparent />
          </StyledText>
          <StyledButton>
            <Button
              as="button"
              text="Install"
              variant="primary"
              onClick={onInstallApp}
            />
          </StyledButton>
        </StyledFlex>
      </StyledPrompt>
    </PromptWrapper>
  );
}

export default PWAPrompt;
