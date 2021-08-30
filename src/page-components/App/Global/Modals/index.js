import React from 'react';
import NewsletterModal from './NewsletterModal';
import NotificationModal from './NotificationModal';
import SignupModal from './SignupModal';
import CollectionModal from './CollectionModal';
/**
 * @description A component to display modals.
 */
function Modals() {
  return (
    <>
      {/*  Add you modals here */}
      <SignupModal />
      <NewsletterModal />
      <NotificationModal />
      <CollectionModal />
    </>
  );
}

export default Modals;
