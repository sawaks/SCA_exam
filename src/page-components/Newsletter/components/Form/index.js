import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Flex } from '@rebass/grid';
import spacing from 'styles/helpers/spacing';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import { Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import Button from 'components/Button';
import { connect } from 'react-redux';
// eslint-disable-next-line
const FormIO = dynamic(import('/components/Form/FormIO'), { ssr: false });

const StyledBox = styled(Box)`
  padding: ${spacing.l} 0 ;
  color: ${props => props.theme.light};
  width: inherit;
  max-width: 530px;
  text-align: center;
  border: none;
  & > div{
    width: 100%;
  }
  .formio-component {
     /* Need to force the background to switch based on form type */
     background: ${props => (props.type === 'modal' ? props.theme.backgroundPrimary : 'none')} !important;
    .form-group{
      margin-bottom: ${spacing.l};
    }
    .form-group:last-child{
     margin-bottom: 0;
    }
    button {
      margin: auto;
    }

    a:hover {
      span {
        color: ${props => props.theme.primary};
      }
    }
  }
`;

const StyledText = styled.div`
  padding: 0 ${spacing.l};
`;

const StyledParagraph = styled.div`
  color: rgba(255,255,255,0.7);
  padding-top: ${spacing.m};
`;

const StyledFlex = styled(Flex)`
  margin-top: ${spacing.l};
`;

function NewsletterForm({ onSubmitDone, onCancelClick, type, setDefault, defaultValues }) {
  useEffect(() => {
    if (type === 'modal') {
      addToDataLayer({
        event: gtm.newsletterModalOpen,
      });
    }
  }, []);
  return (
    <StyledBox>
      <StyledText>
        <Header marginBottom="m" as="h5" text="Sign up to the LiSTNR email newsletter." />
        <StyledParagraph>
          <Paragraph
            variant="l2"
            text="You’ll get occasional emails from us about upcoming podcasts that you might be interested in, new features within our apps, and news from our team."
          />
        </StyledParagraph>
      </StyledText>
      <StyledFlex flexDirection="column" alignItems="center" justifyContent="center">
        <FormIO
          src={process.env.NEXT_PUBLIC_NEWSLETTER_FORM_URL}
          submission={setDefault ? { data: { ...defaultValues } } : null}
          onSubmitDone={onSubmitDone}
          options={{ noAlerts: true }}
        />
        {onCancelClick && (
          <Button
            as="button"
            text="Cancel"
            variant="mono"
            onClick={onCancelClick}
          />
        )}
      </StyledFlex>
    </StyledBox>
  );
}

NewsletterForm.propTypes = {
  onSubmitDone: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  setDefault: PropTypes.bool,
  defaultValues: PropTypes.objectOf(PropTypes.string),

};

NewsletterForm.defaultProps = {
  type: null,
  setDefault: false,
  defaultValues: null,
};

function mapStateToProps({ profile }) {
  const { firstName, lastName, email, userId } = profile;
  return {
    setDefault: Boolean(userId),
    defaultValues: {
      ...(userId && { firstName, lastName, email, isSubscribe: true }),
    },
  };
}

export default connect(mapStateToProps)(NewsletterForm);
