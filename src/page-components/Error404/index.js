import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import routes from 'common/routes';
import styled from 'styled-components';
import { Container, Flex, Box } from 'components/Grid';
import Button from 'components/Button';
import Page from 'components/Layout/Page';
import Section from 'components/Section';
import screen from 'styles/helpers/media';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import ErrorIcon from 'components/Icons/no-podcast-copy.svg';

const Styled404 = styled.h1`
  font-size: 60px;
  margin: 20px 0;
  ${screen.md} {
    font-size: 130px;
  }
`;

const StyledText = styled(Flex)`
  color: rgba(${props => props.theme.secondaryText}, 0.7);
`;

const Content = styled(Flex)`
  min-height: calc(100vh - 400px);
  ${screen.md} {
    min-height: calc(100vh - 300px);
  }
`;

function Error404({ statusCode }) {
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
                <Styled404>{statusCode}</Styled404>
                <Header as="h4" variant="m" text="Error 404 :/ something didn&apos;t quite go to plan..." style={{ textAlign: 'center' }} />
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

Error404.propTypes = {
  statusCode: PropTypes.string,
};

Error404.defaultProps = {
  statusCode: '404',
};

export default Error404;
