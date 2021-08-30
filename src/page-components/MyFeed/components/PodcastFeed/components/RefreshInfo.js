import { Flex } from '@rebass/grid';
import Paragraph from 'components/Typography/Paragraph';
import { string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { timeAgo } from 'utilities/helpers/dateTime';

const Text = styled(Paragraph)`
  opacity: 0.4;
`;

const Dot = styled(Text)`
  margin: 0 ${spacing.m};
`;

const RefreshInfo = ({ refreshDate }) => {
  const today = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Flex
      mt={[spacing.xl, spacing.xl, spacing.l]}
      mb={[spacing.m]}
    >
      {refreshDate && (
        <>
          <Text>{today}</Text>
          <Dot>&middot;</Dot>
          <Text>{`Updated ${timeAgo(refreshDate)}`}</Text>
        </>
      )}
    </Flex>
  );
};

RefreshInfo.propTypes = {
  refreshDate: string.isRequired,
};

export default RefreshInfo;
