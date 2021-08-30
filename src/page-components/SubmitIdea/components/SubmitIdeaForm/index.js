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

class SubmitIdeaForm extends Component {
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
            src={process.env.NEXT_PUBLIC_SUBMITIDEA_FORM_URL}
            submission={null}
            onSubmitDone={() => {
              this.setState({ formSubmitted: true });
            }}
          />
        </StyledFlex>
      ) : (
        <StyledFlex flexDirection="column" alignItems="left">
          <StyledHeading>
            <Header as="h4">Thank you for submitting your podcast idea!</Header>
          </StyledHeading>
          <Paragraph
            variant="l"
            text="Your submission has been sent to our Content Director for further consideration, which will in turn be presented to our content committee regarding licensing or commissioning."
          />
          <Paragraph variant="l" text="If there is a suitable opportunity for LiSTNR to add your podcast to our line-up, we will be in contact shortly." />
          <Paragraph variant="l" text="*Please note, due to the high volume of podcast submissions, we can only respond to those applications which are successful." />
        </StyledFlex>
      );
  }
}

export default SubmitIdeaForm;
