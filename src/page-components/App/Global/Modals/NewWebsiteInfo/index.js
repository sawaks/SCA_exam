import React from 'react';
import styled from 'styled-components';
import { Flex } from 'components/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { hideNewWebInfoModal } from 'store/actions/userInteractions';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import spacing from 'styles/helpers/spacing';
import Link from 'next/link';
import ModalWrapper from '../ModalWrapper';
import StepsButton from '../../../../Authenticate/Forms/StepsButton';
import nameRoutes from '../../../../../common/named-routes';

const StyledWrapper = styled(Flex)`
  border: 1px solid ${props => props.theme.secondaryBorder};
  border-radius: 12px;
  padding: ${spacing.m};
  background: ${props => props.theme.dark};
  position: relative;
`;

const StyledImage = styled.img`
  width: 185px;
  height: 185px;
  margin-top: -105px;
`;

const StyledCTA = styled(Flex)`
  a {
    color: ${props => props.theme.primary};
  }
`;

const NewWebsiteInfo = React.memo(() => {
  const dispatch = useDispatch();
  const displayNewWebInfoModal = useSelector(({ userInteractions }) => userInteractions.displayNewWebInfoModal);

  const handleCloseModal = () => {
    dispatch(hideNewWebInfoModal());
  };

  return (
    <ModalWrapper
      isOpen={displayNewWebInfoModal}
      handleClose={handleCloseModal}
    >
      <StyledWrapper flexDirection="column" justifyContent="center">
        <Flex justifyContent="center" mb={spacing.l}>
          <StyledImage src="/images/newWebsiteInfo.png" />
        </Flex>
        <Header as="h1" variant="l" text="A brand new LiSTNR, designed to provide you with a personalised podcast experience." mb="m" />
        <Paragraph
          variant="l"
          text="If you’ve signed up in the past with either a social or email account, you’ll need to create a new account with us, so we can learn more about what you love to listen to."
          transparent
          mb="m"
        />
        <Paragraph
          variant="l"
          text="For this new experience to work, we can no longer allow you to listen without an account."
          transparent
          mb="m"
        />
        <StyledCTA>
          <Paragraph
            variant="l"
            text="If you have any questions, "
            transparent
            mb="l"
            whiteSpace="pre"
          />
          <Link href={nameRoutes.internal.contactUs}>
            <a>
              <Paragraph
                variant="l"
                text="contact us "
                transparent
                mb="l"
                whiteSpace="pre"
                onClick={handleCloseModal}
              />
            </a>
          </Link>
          <Paragraph
            variant="l"
            text="or check out our "
            transparent
            mb="l"
            whiteSpace="pre"
          />
          <Link
            href={nameRoutes.internal.faq}
          >
            <a>
              <Paragraph
                variant="l"
                text="FAQ"
                transparent
                mb="l"
                onClick={handleCloseModal}
              />
            </a>
          </Link>
        </StyledCTA>
        <StepsButton
          submitText="Ok, Got It"
          withBackButton={false}
          onNextClick={handleCloseModal}
        />
      </StyledWrapper>
    </ModalWrapper>
  );
});

export default NewWebsiteInfo;
