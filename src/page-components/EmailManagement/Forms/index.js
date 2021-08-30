import PropTypes from 'prop-types';
import React from 'react';
import EmailVerification from './EmailVerification';
import PasswordChanged from './PasswordChanged';
import PasswordResetError from './PasswordResetError';
import SetNewPassword from './SetNewPassword';

function RenderForm({ view, ...rest }) {
  switch (view) {
    case 'emailVerification':
      return <EmailVerification {...rest} />;

    case 'setNewPassword':
      return <SetNewPassword {...rest} />;

    case 'resetPasswordError':
      return <PasswordResetError {...rest} />;

    case 'passwordChanged':
      return <PasswordChanged {...rest} />;

    default:
      return null;
  }
}

RenderForm.propTypes = {
  view: PropTypes.string.isRequired,
};

export default RenderForm;
