import { Box, Flex } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { getAllCategories } from 'utilities/api/graphql/categories/queryMethods';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

import AuthenticateWrapper from '../../../../components/Authentication/AuthenticateWrapper';
import StepsButton from '../StepsButton';

function CategoriesSelection({ changeView, userState, updateUserState }) {
  const [categories, setCategories] = useState([]);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const podcastCategories = get(await getAllCategories(), 'categories', []);
      setCategories(podcastCategories);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userState.categories.length > 0) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [userState.categories]);

  const handleNextClick = () => {
    addToDataLayer({
      event: gtm.onboarding3TopicSetUpCategories,
      categories: userState.categories.map(item => item.name),
      pageType: page.emailSignup,
    });
    changeView('step3');
  };

  const previousScreen = () => {
    changeView('step1');
  };

  const handleCategoryClick = (category) => {
    if (!userState.categories.find(item => item.id === category.id)) {
      updateUserState({
        ...userState,
        categories: [
          ...userState.categories,
          {
            id: category.id,
            slug: category.slug,
            name: category.name,
          },
        ],
      });
      return;
    }
    updateUserState({ ...userState, categories: [...userState.categories.filter(item => item.id !== category.id)] });
  };

  return (
    <>
      <AuthenticateWrapper
        withHero={false}
        fixedButton
        button={(
          <StepsButton
            step="02"
            disabled={disableButton}
            onNextClick={handleNextClick}
            onGoBackClick={previousScreen}
          />
        )}
      >
        <Box width={1}>
          <Box mt={[spacing.l, 0]} mb={spacing.s}>
            <Header variant="l" as="h1" text="What do you love listening to?" mb="s" data-test="categories-header" />
          </Box>
          <Box mb={[spacing.xl, spacing.l]}>
            <Paragraph variant="l" text="Choose one or more categories." transparent mb="l" />
          </Box>
          <Flex flexWrap="wrap" mb={spacing.xl}>
            {
              categories?.map((category, i) => {
                const categoryImage = userState.categories.find(item => item.id === category.id) ? get(category, 'images.bannerLarge.url') : '';
                return (
                  <StyledBox
                    onClick={() => handleCategoryClick(category)}
                    alignItems="flex-end"
                    index={i}
                    p={spacing.m}
                    mb={spacing.m}
                    key={category.slug}
                    imageUrl={categoryImage}
                  >
                    <Header as="h3" text={category.name} style={{ fontSize: '14px' }} />
                  </StyledBox>
                );
              })
            }
          </Flex>
        </Box>
      </AuthenticateWrapper>
    </>
  );
}

const StyledBox = styled(Flex)`
  height: 80px;
  width: calc(50vw - 20px);
  border-radius: 12px;
  cursor: pointer;
  border: solid 1px rgba(255, 255, 255, 0.16);
  background-color: ${props => props.theme.backgroundLight};
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'none')};
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: ${props => ((props.index + 1) % 2 === 0 ? 0 : spacing.m)};

  ${screen.md} {
    width: 159px;
    margin-right: ${props => ((props.index + 1) % 3 === 0 ? 0 : spacing.m)};
  }
`;

CategoriesSelection.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default CategoriesSelection;
