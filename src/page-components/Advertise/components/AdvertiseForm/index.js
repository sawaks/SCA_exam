import React, { Component } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Flex } from '@rebass/grid';
import spacing from 'styles/helpers/spacing';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
// eslint-disable-next-line
const FormIO = dynamic(import('/components/Form/FormIO'), { ssr: false });

const StyledHeading = styled.div`
  margin-bottom: ${spacing.l};
`;

const StyledFlex = styled(Flex)`
  margin-top: ${spacing.l};
`;

class AdvertiseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formSubmitted: false,
    };
  }

  render() {
    return (!this.state.formSubmitted)
      ? (
        <StyledFlex flexDirection="column" alignItems="center" justifyContent="center">
          <FormIO
            src={process.env.NEXT_PUBLIC_AD_FORM_URL}
            submission={null}
            onSubmitDone={() => {
              this.setState({ formSubmitted: true });
            }}
          />
        </StyledFlex>
      ) : (
        <StyledFlex flexDirection="column" alignItems="left">
          <StyledHeading>
            <Header as="h4">Your form has been submitted!</Header>
          </StyledHeading>
          <Paragraph variant="l" text="Thanks for your enquiry, we'll be in touch shortly." />
        </StyledFlex>
      );
  }
}

export default AdvertiseForm;
