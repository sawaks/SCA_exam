import FAQs from 'page-components/Faq';
import getFAQs from 'utilities/api/graphql/faq/queryMethods';

export const getServerSideProps = async () => {
  const { faqs } = await getFAQs();
  return {
    props: {
      faqs,
    },
  };
};

export default FAQs;
