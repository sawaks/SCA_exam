import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { closeNewsletterModal } from 'store/actions/userInteractions';
import toast from 'utilities/helpers/toast';
import Form from 'page-components/Newsletter/components/Form';
import ModalWrapper from '../ModalWrapper';

class NewsletterModal extends PureComponent {
  static propTypes = {
    displayNewsletterModal: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  onCancelClick = () => {
    addToDataLayer({ event: gtm.newsletterModalCancel });
    this.props.dispatch(closeNewsletterModal());
  };

  onSubmit = () => {
    toast('You’ve successfully subscribed to the LiSTNR Newsletter');
    addToDataLayer({ event: gtm.newsletterModalSubmitSuccess });
    this.props.dispatch(closeNewsletterModal());
  };

  render() {
    return (
      <>
        <ModalWrapper
          isOpen={this.props.displayNewsletterModal}
          handleClose={this.onCancelClick}
        >
          <StyledModal>
            <Form
              onSubmitDone={this.onSubmit}
              type="modal"
              onCancelClick={this.onCancelClick}
            />
          </StyledModal>
        </ModalWrapper>
      </>
    );
  }
}

const StyledModal = styled.div`
    width: 100%;
    display: flex;
    align-content:center;
    align-items: center;
    justify-content: center;
    margin: 0;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.light};
    background-color: ${props => props.theme.backgroundLight};
`;

function mapStateToProps({ profile, userInteractions }) {
  return {
    isLoggedIn: Boolean(profile.userId),
    displayNewsletterModal: userInteractions.displayNewsletterModal,
  };
}

export default connect(mapStateToProps)(NewsletterModal);
