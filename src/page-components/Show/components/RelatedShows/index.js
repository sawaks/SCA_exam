import { Box, Flex } from '@rebass/grid';
import Divider from 'components/Divider';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import get from 'lodash/get';
import Link from 'next/link';
import routes from 'common/named-routes';
import { arrayOf, shape, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';

const StyledHeaderText = styled(Box)`
  text-align: left;
`;

const Circle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.14);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  ${screen.md} {
    width: 120px;
    height: 120px;
   }
`;

const StyledImage = styled.img`
  max-height: 100%;
  height: 100%;
  width: auto;
`;

const DividerWrapper = styled.div`
  width: 95%;
`;

const MoreShowFrom = ({ show, imagePath, type }) => (
  <>
    {
      show.map((item) => {
        const imageUrl = get(item, imagePath, '');
        const name = get(item, 'name', '');
        const slug = get(item, 'slug', '');
        return (
          <Link
            href={`${routes.external[type]}/${slug}`}
            passHref
            key={slug}
          >
            <a>
              <Flex width={['110px', '110px', '120px']} flexDirection="Column" alignItems="center" mr={[spacing.m, spacing.m, spacing.l]} mt={[spacing.m, spacing.m, spacing.l]}>
                <Circle>
                  {imageUrl && (<StyledImage src={imageUrl} alt="show image" />)}
                </Circle>
                <Paragraph as="p" variant="m" mt="m" text={name} linesToShow={2} marginBottom="m" style={{ textAlign: 'center' }} />
              </Flex>
            </a>
          </Link>
        );
      })
      }
  </>
);

const RelatedShows = ({ creators, categories }) => (
  <Flex flexDirection="column">
    <StyledHeaderText mt={[spacing.l, spacing.l, spacing.xl]}>
      <Header as="h1" variant="m" text="More from" mb="m" />
    </StyledHeaderText>
    <DividerWrapper>
      <Divider />
    </DividerWrapper>
    <Flex flexDirection="row" mb={['12px', '12px', '70px']} flexWrap="wrap">
      {creators.length ? <MoreShowFrom type="creator" show={creators} imagePath="image.url" slugPath="creatorSlug" /> : null}
      {categories.length ? <MoreShowFrom type="category" show={categories} imagePath="images.squareMedium.url" slugPath="catSlug" /> : null}
    </Flex>
  </Flex>
);

RelatedShows.propTypes = {
  creators: arrayOf(shape).isRequired,
  categories: arrayOf(shape).isRequired,
};

MoreShowFrom.propTypes = {
  show: arrayOf(shape({
    name: string,
    slug: string,
    images: shape({ url: string }),
  })).isRequired,
  imagePath: string.isRequired,
  type: string.isRequired,
};

export default RelatedShows;
