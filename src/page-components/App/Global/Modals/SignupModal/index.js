import CreateAccount from 'components/Authentication/CreateAccount';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSignupModal } from 'store/actions/userInteractions';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import usePrevious from 'utilities/helpers/usePrevious';
import ModalWrapper from '../ModalWrapper';

const SignupModal = React.memo(() => {
  const dispatch = useDispatch();
  const displaySignUpModal = useSelector(({ userInteractions }) => userInteractions.displaySignUpModal);
  const previousDisplaySignUpModal = usePrevious(displaySignUpModal);

  useEffect(() => {
    if (previousDisplaySignUpModal !== displaySignUpModal && displaySignUpModal) {
      addToDataLayer({
        event: gtm.onboarding0CreateAccountPopup,
      });
    }
  }, [displaySignUpModal]);

  const handleNoThanksClick = () => {
    dispatch(closeSignupModal());
  };

  return (
    <ModalWrapper
      isOpen={displaySignUpModal}
      handleClose={handleNoThanksClick}
    >
      <CreateAccount handleNoThanks={handleNoThanksClick} />
    </ModalWrapper>
  );
});

export default SignupModal;
