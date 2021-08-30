import { Box } from '@rebass/grid';
import Paragraph from 'components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import AnimateToggle from '../AnimateToggle';

const FaqAnswer = ({ answer, visible }) => (
  <>
    <AnimateToggle visible={visible}>
      <AnswerWrapper>
        <Box mb={[spacing.s, spacing.l, spacing.l]} mr={[spacing.l, spacing.l, spacing.xl]}>
          {answer.split('\n\n').map((item) => {
            const urlify = (text) => {
              const urlRegex = /(https?:\/\/[^\s]+)/g;
              return text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
            };
            const html = urlify(item);
            const key = item.slice(0, 16);
            return <Paragraph key={key} variant="m" transparent dangerouslySetInnerHTML={{ __html: html }} />;
          })}
        </Box>
      </AnswerWrapper>
    </AnimateToggle>
  </>
);

const AnswerWrapper = styled.div`
  overflow: hidden;
  height: auto;
  a {
    color: ${props => props.theme.primary};
    word-break: break-all;
  }
`;

FaqAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default FaqAnswer;
