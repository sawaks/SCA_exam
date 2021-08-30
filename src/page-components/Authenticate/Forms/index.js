import EmailSent from 'page-components/Authenticate/Forms/EmailSent';
import PropTypes from 'prop-types';
import React from 'react';

import CategoriesSelection from './CategoriesSelection';
import GenresSelection from './GenresSelection';
import Done from './Done';
import EnterPassword from './EnterPassword';
import Login from './Login';
import ResetPassword from './ResetPassword';
import ShowsSelection from './ShowsSelection';
import Signup from './Signup';
import UserDetailsForm from './UserDetails';
import VerifyEmail from './VerifyEmail';
import ActivationCode from './ActivationCode';
import ActivationSuccess from './ActivationSuccess';
import MusicOnboarding from './MusicOnboarding';
import StationsSelection from './StationSelection';

function RenderForm({ view, ...rest }) {
  switch (view) {
    case 'login':
      return <Login {...rest} />;

    case 'step1':
      return <Signup {...rest} />;

    case 'step2':
      return <CategoriesSelection {...rest} />;

    case 'step3':
      return <ShowsSelection {...rest} />;

    case 'step4':
      return <GenresSelection {...rest} />;

    case 'step5':
      return <StationsSelection {...rest} />;

    case 'step6':
      return <UserDetailsForm {...rest} />;

    case 'enterPassword':
      return <EnterPassword {...rest} />;

    case 'verifyEmail':
      return <VerifyEmail {...rest} />;

    case 'emailSent':
      return <EmailSent {...rest} />;

    case 'resetPassword':
      return <ResetPassword {...rest} />;

    case 'musicOnboarding':
      return <MusicOnboarding {...rest} />;

    case 'done':
      return <Done {...rest} />;

    case 'activationCode':
      return <ActivationCode {...rest} />;

    case 'activationSuccess':
      return <ActivationSuccess {...rest} />;

    default:
      return <Login {...rest} />;
  }
}

RenderForm.propTypes = {
  view: PropTypes.string.isRequired,
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default RenderForm;
