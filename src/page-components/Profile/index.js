import nameRoutes from 'common/named-routes';
import Button from 'components/Button';
import Divider from 'components/Divider';
import Footer from 'components/Footer';
import Dropdown from 'components/Form/Dropdown';
import DateControl from 'components/Form/Input/Date';
import Postcode from 'components/Form/Input/Postcode';
import Text from 'components/Form/Input/Text';
import { Box, Container, Flex } from 'components/Grid';
import Page from 'components/Layout/Page';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import Head from 'next/head';
import { withRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { resetPasswordWithEmail } from 'store/actions/auth-email';
import { fetchUserProfile, signOutUser } from 'store/actions/profile';
import styled from 'styled-components';
import media from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import * as profileApi from 'utilities/api/firebase/profile';
import { LISTNR_META } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import getISOStringWithoutMillisec from 'utilities/helpers/getISOStringWithoutMillisec';
import Logger from 'utilities/helpers/logger';
import toast from 'utilities/helpers/toast';

const StyledProfile = styled(Flex)`
  width: inherit;
  padding-bottom: 0;
  padding-top: 0;

  ${media.md} {
    padding-bottom: ${spacing.m};
  }
`;

const FormContainer = styled.div`
  width: 100%;

  padding-top: ${spacing.l};
  ${media.md} {
    padding-top: ${spacing.xl};
  }
`;

const StyledParagraph = styled(Paragraph)`
  padding-bottom: ${spacing.m};
`;

const StyledContainer = styled.div`
  ${props => !props.noBorder && `border-top: 1px solid ${props.theme.LEGACY_secondaryBorder}`};
  padding: ${spacing.m} 0;
  ${media.md} {
    padding: ${spacing.l} 0;
  }
`;

// With Query Component
const Profile = (props) => {
  const { isLoggin, router, profile } = props;
  const { email } = profile;

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.profilePage,
    });
  }, []);

  useEffect(() => {
    if (!isLoggin) {
      router.push(`${nameRoutes.internal.root}`, `${nameRoutes.external.root}`);
    }
  }, [isLoggin, router]);

  const signout = async () => {
    try {
      await props.signOutUser();
      toast('You have successfully signed out');
    } catch (e) {
      Logger.error(e);
    }
  };

  const onResetPassword = async () => {
    addToDataLayer({ event: gtm.resetEmailPasswordSubmitBtnClicked });
    try {
      const resetPassword = await props.resetPasswordWithEmail(email);
      if (resetPassword) {
        toast('Thanks, we’ve sent you an email with a link to reset your password');
        addToDataLayer({ event: gtm.profileResetPasswordBtnClicked });
      }
    } catch (e) {
      Logger.error(e);
    }
  };

  const onSubmit = async (values) => {
    try {
      // eslint-disable-next-line no-shadow
      const { firstName, lastName, gender, dob, postcode, userId } = values;
      const todaysDate = getISOStringWithoutMillisec(new Date());
      const payload = {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        gender,
        dob,
        postcode,
        uid: userId,
        lastUpdateDate: todaysDate,

      };
      addToDataLayer({ event: gtm.profileUpdateDetailsBtnClicked });
      await profileApi.updateProfileData(payload, userId);
      await props.fetchUserProfile();
      toast('Your details have been successfully updated');
    } catch (e) {
      Logger.error(e);
    }
  };

  return (
    <Page withNav withAudio>
      <Head>
        <title>{LISTNR_META.pages.profile.title}</title>
        <meta name="title" content={LISTNR_META.pages.profile.title} />
        <meta name="description" content={LISTNR_META.pages.profile.description} />
      </Head>
      <Container>
        <StyledProfile>
          {profile.firstName && profile.lastName && (
          <Header
            as="h2"
            variant="xl"
            mb="m"
            text={`Hi ${profile.firstName.charAt(0).toUpperCase() + profile.firstName.slice(1)} ${profile.lastName.charAt(0).toUpperCase() + profile.lastName.slice(1)}`}
          />
          )}
        </StyledProfile>
        <Divider opacity={0.15} />
        <FormContainer>
          <Form
            onSubmit={onSubmit}
            keepDirtyOnReinitialize
            initialValues={profile}
          >
            {({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <StyledParagraph
                  variant="xl"
                  text="Personal details"
                />
                <StyledContainer>
                  <Flex flexWrap="wrap" justifyContent="space-between" mt={[24, 24, 0]}>
                    <Box width={[1, 1, 0.49]}>
                      <Text name="firstName" label="First Name" dataTest="first-name" />
                    </Box>
                    <Box width={[1, 1, 0.49]}>
                      <Text name="lastName" label="Last Name" dataTest="last-name" />
                    </Box>
                  </Flex>
                  <Flex flexWrap="wrap" justifyContent="space-between">
                    <Box width={[1, 1, 0.49]}>
                      <Dropdown
                        name="gender"
                        label="Gender"
                        options={{ Male: 'Male', Female: 'Female', Other: 'Prefer not to say' }}
                        dataTest="gender"
                      />
                    </Box>
                    <Box width={[1, 1, 0.49]}>
                      <DateControl name="dob" label="Date of Birth" dataTest="dob" />
                    </Box>
                  </Flex>
                  <Flex flexWrap="wrap" justifyContent="space-between">
                    <Box width={[1, 1, 0.49]}>
                      <Postcode name="postcode" label="Postcode" dataTest="postcode" />
                    </Box>
                  </Flex>
                </StyledContainer>
                <Box width={[1, 1, 0.49]}>
                  <Button
                    variant="primary"
                    showBorder
                    disabled={submitting || pristine}
                    isProgress={submitting}
                    text="UPDATE DETAILS"
                    type="submit"
                  />
                </Box>
                <Box mt={[24, 24, 48]}>
                  <StyledParagraph
                    variant="xl"
                    text="Account Login"
                  />
                </Box>
                <StyledContainer>
                  <Flex flexDirection="column">
                    <Paragraph as="span" variant="l" text={email} marginLeft="m" />
                    <Box width={[1, 1, 0.49]} mt="24px" mb={[12, 12, 24]}>
                      <Button as="button" variant="secondary" showBorder text="RESET PASSWORD" onClick={onResetPassword} type="button" />
                    </Box>
                  </Flex>
                </StyledContainer>
                <StyledContainer>
                  <Box width={[1, 1, 0.49]} mt={[12, 12, 24]} mb={[12, 12, 96]}>
                    <Button
                      as="button"
                      type="button"
                      text="Logout"
                      variant="primary"
                      minWidthMobile="100%"
                      maxWidthDesktop="320px"
                      data-test="logout"
                      showBorder
                      onClick={() => signout()}
                    />
                  </Box>
                </StyledContainer>
              </form>
            )}
          </Form>
        </FormContainer>
      </Container>
      <Footer />
    </Page>
  );
};

Profile.propTypes = {
  isLoggin: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    loginMethod: PropTypes.string,
    email: PropTypes.string,
    lastName: PropTypes.string,
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signOutUser: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  resetPasswordWithEmail: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  profile: null,
};

function mapStateToProps({ profile }) {
  return {
    isLoggin: Boolean(profile.userId),
    profile,
    isFCMRegistered: profile.fcm.isFCMRegistered,
  };
}

const mapDispatchToProps = {
  signOutUser,
  fetchUserProfile,
  resetPasswordWithEmail,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
