import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'components/Grid';
import spacing from 'styles/helpers/spacing';
import styled from 'styled-components';
import Header from 'components/Typography/Header';
import Button from 'components/Button';
import { closeNotificationsModal, notificationRejected, notificationPermissionRequested } from 'store/actions/userInteractions';
import ModalWrapper from '../ModalWrapper';

const NotificationsModal = React.memo(() => {
  const dispatch = useDispatch();
  const displayNotificationsModal = useSelector(state => state.userInteractions.displayNotificationsModal);
  const notificationsModalText = useSelector(state => state.userInteractions.notificationsModalText);

  const handleNoThanksClick = () => {
    dispatch(closeNotificationsModal());
    dispatch(notificationRejected());
  };

  const requestPermission = () => {
    dispatch(closeNotificationsModal());
    dispatch(notificationPermissionRequested());
  };

  return (
    <>
      <ModalWrapper
        isOpen={displayNotificationsModal}
        handleClose={handleNoThanksClick}
      >
        <StyledModal>
          <StyledBox>
            <Header marginBottom="m" as="h5" text={notificationsModalText} />
            <Button
              as="button"
              text="REQUEST NOTIFICATION PERMISSION"
              onClick={requestPermission}
            />
            <Button
              as="button"
              onClick={handleNoThanksClick}
              text="NO THANKS"
              variant="tertiary"
            />
          </StyledBox>
        </StyledModal>
      </ModalWrapper>
    </>
  );
});

const StyledModal = styled.div`
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.LEGACY_secondary};
`;

const StyledBox = styled(Box)`
  padding: ${spacing.xl};
  text-align: center;
  color: ${props => props.theme.LEGACY_primaryText};
  width: inherit;
  max-width: 550px;
  & > div,
  form,
  button {
    width: 100%;
  }
`;

export default NotificationsModal;
