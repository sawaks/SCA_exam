import React, { useEffect } from 'react';
import Head from 'next/head';
import Page from 'components/Layout/Page';
import { Container, Flex, Box } from 'components/Grid';
import PropTypes from 'prop-types';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import spacing from 'styles/helpers/spacing';
import Header from 'components/Typography/Header';
import { LISTNR_META } from 'utilities/constants';
import FAQCard from './components/FAQcard';

const FAQs = ({ faqs }) => {
  const { title, items } = faqs;

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.faqPage,
    });
  }, []);

  return (
    <Page withNav withAudio withFooter>
      <Head>
        <title>{LISTNR_META.pages.faq.title}</title>
        <meta name="title" content={LISTNR_META.pages.faq.title} />
        <meta name="description" content={LISTNR_META.pages.faq.description} />
      </Head>
      <Container>
        <Flex flexWrap="wrap">
          <Flex width={[1, 1, 1 / 3]} my={spacing.xl}>
            <Box>
              <Header as="h2" variant="xl" text={title} />
            </Box>
          </Flex>
          <Flex mt={[0, 0, spacing.xl]} mb={[spacing.s, spacing.s, spacing.xl]} width={[1, 1, 2 / 3]}>
            <Box>
              {items.map((data, i) => (
                <FAQCard
                  key={data.question}
                  index={i + 1}
                  title={data.question}
                  description={data.answer}
                />
              ))}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Page>
  );
};

FAQs.propTypes = {
  faqs: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.string,
    })),
  }).isRequired,
};

export default FAQs;
