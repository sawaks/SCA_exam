import { Box, Flex } from '@rebass/grid';
import namedRoutes from 'common/named-routes';
import get from 'lodash/get';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import CheckboxInput from 'components/Form/Checkbox';
import Dropdown from 'components/Form/Dropdown';
import Date from 'components/Form/Input/Date';
import Postcode from 'components/Form/Input/Postcode';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { Form } from 'react-final-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { signupWithEmail } from 'store/actions/auth-email';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

import StepsButton from '../StepsButton';
import { ACTIVATE_DEVICE_TYPE } from '../../../../utilities/constants';

function UserDetailsForm({ changeView, userState, updateUserState, deviceType }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const browser = useSelector(state => state.device.browser, shallowEqual);
  const redirectUrl = useSelector(state => (state.userInteractions.redirectUrl));
  const { favouriteShows, favouriteCategories, favouriteStations, favouriteGenres } = useSelector(({ userSessionInfo }) => ({
    favouriteShows: get(userSessionInfo, 'favouriteShows', null),
    favouriteCategories: get(userSessionInfo, 'favouriteCategories', null),
    favouriteStations: get(userSessionInfo, 'favouriteStations', null),
    favouriteGenres: get(userSessionInfo, 'favouriteGenres', null),
  }), shallowEqual);

  const loginRedirect = redirectUrl || namedRoutes.internal.myFeed;

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.emailSignup,
    });
  }, []);

  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, [focusRef]);

  useEffect(() => {
    const KruxLoadAfterRegistration = () => {
      const favCatNames = favouriteCategories.map(data => data.name);
      const favShowNames = Object.values(favouriteShows).map(data => data.name);
      const favStationNames = Object.values(favouriteStations).map(data => data.name);
      const favGenres = favouriteGenres.map(data => data.name);

      if (favCatNames && favShowNames && favStationNames && favGenres) {
        window.scaGtmDataLayer.push({
          event: 'onKruxChanged',
          declared_categories: favCatNames,
          declared_shows: favShowNames,
          declared_stations: favStationNames,
          declared_genres: favGenres,
          kxsegment: window.Krux ? window.Krux.segments : null,
        });
        window.Krux('ns:sca', 'page:load', null, { pageView: false });
      }
    };

    KruxLoadAfterRegistration();
  }, [favouriteShows, favouriteCategories, favouriteStations, favouriteGenres]);

  const onSubmit = async (values) => {
    setLoading(true);

    // eslint-disable-next-line camelcase
    const receivePromo = (values.check_box && values.check_box[0] === 'receive_promo') || false;
    if (receivePromo) {
      addToDataLayer({
        event: gtm.onboarding8SuccessfulNewsletterSignup,
        pageType: page.emailSignup,
      });
    }

    addToDataLayer({
      event: gtm.onboarding6DemoSetupComplete,
      pageType: page.emailSignup,
    });

    const userInfo = {
      ...userState,
      gender: values.gender,
      dob: values.date_of_birth,
      postcode: values.postcode,
      receivePromo,
      signUpApp: browser.mobile ? 'mobileWeb' : 'web',
    };

    updateUserState(userInfo);
    const userCreated = await dispatch(signupWithEmail(userInfo));

    if (userCreated) {
      if (deviceType === ACTIVATE_DEVICE_TYPE.tv) {
        addToDataLayer({
          event: gtm.onboarding6SuccessfulSignUpCompleteTV,
          pageType: page.emailSignup,
        });
        changeView('activationCode');
        return;
      }

      if (deviceType === ACTIVATE_DEVICE_TYPE.smartDevices) {
        addToDataLayer({
          event: gtm.onboarding6SuccessfulSignUpCompleteSmartDevices,
          pageType: page.emailSignup,
        });
        changeView('activationSuccess');
        return;
      }

      addToDataLayer({
        event: gtm.onboarding7SuccessfulSignUpComplete,
        pageType: page.emailSignup,
      });

      router.push(`${loginRedirect}`);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (values.password !== values.confirm_password) {
      errors.confirm_password = 'Password does not match';
    }

    return errors;
  };

  const previousScreen = () => {
    addToDataLayer({ event: gtm.emailGoBackBtnClicked });
    changeView('step5');
  };

  return (
    <StyledSignupForm>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        keepDirtyOnReinitialize
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <AuthenticateWrapper
              withHero={false}
              button={(
                <HeroBottom>
                  <StepsButton
                    step="04"
                    disabled={submitting || loading}
                    submitting={submitting || loading}
                    onNextClick={() => addToDataLayer({ event: gtm.emailContinueBtnClicked })
                    }
                    onGoBackClick={previousScreen}
                  />
                </HeroBottom>
              )}
            >
              <Box width={1}>
                <Box mt={[spacing.l, 0]} mb={spacing.s}>
                  <Header
                    variant="l"
                    as="h1"
                    text="Just one last thing"
                    data-test="final-details-header"
                  />
                </Box>
                <Box mb={[spacing.xl, spacing.l]}>
                  <Paragraph
                    variant="l"
                    text="To allow us make better recommendations and custom advertising, please provide the details below."
                    transparent
                  />
                </Box>
                <Dropdown
                  name="gender"
                  label="Gender"
                  options={{ Male: 'Male', Female: 'Female', Other: 'Prefer not to say' }}
                  ref={focusRef}
                />
                <Date name="date_of_birth" label="Date of Birth" />
                <Postcode name="postcode" label="Postcode" />
                <Box mt={spacing.l} mb={spacing.xl}>
                  <CheckboxInput
                    name="check_box"
                    label=""
                    options={{
                      receive_promo:
                        'Yes, sign me up to the LiSTNR email newsletter so that I can receive updates about upcoming podcasts and additional information relevant to me.',
                    }}
                    sendEmail={userState.email}
                  />
                </Box>
              </Box>
            </AuthenticateWrapper>
          </form>
        )}
      />
    </StyledSignupForm>
  );
}

UserDetailsForm.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  deviceType: PropTypes.string,
};

UserDetailsForm.defaultProps = {
  deviceType: ACTIVATE_DEVICE_TYPE.web,
};

const HeroBottom = styled(Flex)`
  align-items: flex-end;
  height: 182px;
  width: calc(100% + 26px);
  margin-left: -13px;
  margin-bottom: -13px;
  padding: 0 ${spacing.m} ${spacing.m} ${spacing.m};
  background: ${"url('/images/hero-bottom.png') no-repeat center"};
  background-size: 100%;

  ${screen.sm} {
    width: calc(100% + 25px);
    margin-left: -${spacing.m};
    margin-bottom: -${spacing.m};
    padding: 0 ${spacing.l} ${spacing.m} ${spacing.m};
    background: ${"url('/images/hero-bottom2.png') no-repeat center"};
    background-size: cover;
  }
`;

const StyledSignupForm = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  & form {
    height: 100%;
  }
`;

export default UserDetailsForm;
