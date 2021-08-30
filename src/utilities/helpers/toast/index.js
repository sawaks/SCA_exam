import React from 'react';
import { toast } from 'react-toastify';
import Paragraph from 'components/Typography/Paragraph';
import errorCodes from './errorCodes';

// dismiss toast with delay
const dismissToast = (toastId, delay) => {
  setTimeout(() => {
    toast.dismiss(toastId);
  }, delay);
};

// open toast and dismiss it after 10s delay by default
const openToast = (toastContent, delay = 10000) => {
  // disable autoClose because autoClose is unreliable and we will dismiss the toast manually
  const toastId = toast(toastContent,
    {
      autoClose: false,
    }
  );

  // dismiss toast after 10s delay by default
  dismissToast(toastId, delay);
};

// This function can fire a variety of toasts messages depending on whether an
// error code, error message or just a plain string is provide. If an error code is given then it
// will try to retrieve the store message for that error code.
export default function toastWrapper(msg) {
  if (typeof msg === 'object') {
    // toast with code object
    if (Object.prototype.hasOwnProperty.call(msg, 'code')) {
      const title = errorCodes[msg.code] ? errorCodes[msg.code].title : errorCodes.default.title;
      const text = errorCodes[msg.code] ? errorCodes[msg.code].text : errorCodes.default.text;
      openToast(
        <>
          <Paragraph variant="l" text={`${title}`} />
          <Paragraph variant="m" text={`${text}`} />
        </>
      );
      return;
    }

    // toast with message object
    if (Object.prototype.hasOwnProperty.call(msg, 'message')) {
      openToast(<Paragraph variant="l" text={`${msg.message}`} />);
      return;
    }
  }

  // default toast with message
  openToast(<Paragraph variant="l" text={`${msg}`} />);
}
