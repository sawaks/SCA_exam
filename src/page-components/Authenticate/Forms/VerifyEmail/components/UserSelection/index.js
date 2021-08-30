import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { throttle } from 'lodash';
import { Box, Flex } from '@rebass/grid';
import Header from 'components/Typography/Header';
import QAIcon from 'components/Icons/questionAnswer.svg';
import EmailIcon from 'components/Icons/email.svg';
import SupportIcon from 'components/Icons/contactSupport.svg';
import ArrowIcon from 'components/Icons/arrow-right.svg';
import Spinner from 'components/Button/Spinner';
import Logger from 'utilities/helpers/logger';
import toast from 'utilities/helpers/toast';
import { sendEmailVerification } from 'utilities/api/firebase/auth';
import Divider from 'components/Divider';
import { shallowEqual, useSelector } from 'react-redux';

const UserSelection = ({ iconType, title, clickAction, sending, setSending, changeView }) => {
  const { email } = useSelector(state => state.profile, shallowEqual);

  const handleResendEmail = async () => {
    setSending(true);
    addToDataLayer({ event: gtm.verifyEmailResendBtnClicked });
    try {
      await sendEmailVerification(email);
      changeView('emailSent');
    } catch (e) {
      Logger.error(e);
      toast(e);
    } finally {
      setSending(false);
    }
  };

  const handleClick = () => {
    if (clickAction === 'verificationEmail') {
      // send verification email to user's email address
      const throttled = throttle(handleResendEmail, 5000);
      throttled();
      addToDataLayer({
        event: gtm.verifyEmailResendBtnClicked,
        pageType: page.login,
      });
    } if (clickAction === '/faq') {
      addToDataLayer({
        event: gtm.verifyEmailFaqBtnClicked,
        pageType: page.login,
      });
    } if (clickAction === '/contact-us') {
      addToDataLayer({
        event: gtm.verifyEmailcontactUsBtnClicked,
        pageType: page.login,
      });
    }
  };

  return (
    <>
      {clickAction === 'verificationEmail' ? (
        <>
          <SelectionHeader onClick={handleClick}>
            <Flex mr={spacing.m} alignItems="center">
              <Box mr={spacing.m}>
                <EmailIcon />
              </Box>
              <Header as="h1" variant="s" text={title} style={{ lineHeight: '66px' }} />
            </Flex>
            <Flex alignItems="center">
              { sending && (
              <span style={{ marginRight: spacing.m }}>
                <Spinner />
              </span>
              )}
              <ArrowIcon />
            </Flex>
          </SelectionHeader>
          <Divider opacity={0.15} />
        </>
      ) : (
        <a target="_blank" rel="noopener noreferrer" href={clickAction} onClick={handleClick}>
          <SelectionHeader>
            <Flex mr={spacing.m} alignItems="center">
              <Box mr={spacing.m}>
                {iconType === 'support' && <SupportIcon />}
                {iconType === 'faq' && <QAIcon />}
              </Box>
              <Header as="h1" variant="s" text={title} style={{ lineHeight: '66px' }} />
            </Flex>
            <Flex alignItems="center">
              <ArrowIcon />
            </Flex>
          </SelectionHeader>
          <Divider opacity={0.15} />
        </a>
      )}
    </>
  );
};

const SelectionHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

UserSelection.propTypes = {
  iconType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickAction: PropTypes.string.isRequired,
  sending: PropTypes.bool,
  setSending: PropTypes.func,
  changeView: PropTypes.func,
};
UserSelection.defaultProps = {
  sending: false,
  setSending: () => {},
  changeView: () => {},
};

export default UserSelection;
