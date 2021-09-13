import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import routes from 'routes';
import styled from 'styled-components';
import { Container, Flex, Box } from 'shared-components/Grid';
import Button from 'shared-components/Button';
import Page from 'shared-components/Layout/Page';
import Section from 'shared-components/Layout/Section';
import screen from 'src/styling/screen';
import Header from 'shared-components/Typography/Header';
import Paragraph from 'shared-components/Typography/Paragraph';
import ErrorIcon from 'shared-components/Icons/NoPodcast';

const StyledErrorCode = styled.h1`
  font-size: 60px;
  margin: 20px 0;
  ${screen.tablet} {
    font-size: 130px;
  }
`;

const StyledText = styled(Flex)`
  color: rgba(${props => props.theme.secondaryText}, 0.7);
`;

const Content = styled(Flex)`
  min-height: calc(100vh - 400px);
  ${screen.tablet} {
    min-height: calc(100vh - 300px);
  }
`;

function Error({ statusCode, statusMessage }) {
  return (
    <Page withNav withAudio withFooter>
      <Container>
        <Section>
          <Content flexDirection="column" alignItems="center" justifyContent="center" p={['15px', '15px', '20px']}>
            <Box>
              <ErrorIcon />
            </Box>
            <Box>
              <StyledText flexDirection="column" alignItems="center">
                <StyledErrorCode>{statusCode}</StyledErrorCode>
                <Header as="h4" variant="m" text={`Error ${statusCode}: ${statusMessage}`} style={{ textAlign: 'center' }} />
                <Paragraph
                  variant="xl"
                  marginTop="m"
                  marginBottom="xl"
                  text="Hit the link below and let&apos;s start again."
                />
                <Link
                  href={`${routes.root}`}
                  passHref
                >
                  <Button
                    as="a"
                    text="Go Home"
                    variant="Primary"
                    maxWidthDesktop="2000px"
                    margin="48px 0"
                  />
                </Link>
              </StyledText>
            </Box>
          </Content>
        </Section>
      </Container>
    </Page>
  );
}

Error.getInitialProps = async ({ res }) => {
  const { statusCode, statusMessage } = res;
  return { statusCode, statusMessage };
};

Error.propTypes = {
  statusCode: PropTypes.number,
  statusMessage: PropTypes.string,
};

Error.defaultProps = {
  statusCode: 404,
  statusMessage: '/ something didn\'t quite go to plan...',
};

export default Error;
