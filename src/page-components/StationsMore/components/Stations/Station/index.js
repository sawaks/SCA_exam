import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Flex } from 'components/Grid';
import Paragraph from 'components/Typography/Paragraph';
import { string, shape } from 'prop-types';
import spacing from 'styles/helpers/spacing';

const LogoContainer = styled.div`
  display: inline-block;
  border-radius: 8px;
  background-color: ${props => props.backgroundColour};
  height: 46px;
  img {
    vertical-align: middle;
  }
`;

const TopPad = styled.div`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`;

const Image = styled.img`
  vertical-align: middle;
  width: 46px;
`;

const StationContainer = styled(Flex)`
  margin-bottom: ${spacing.m};
`;

const Station = ({ stationItem }) => {
  const { name, slug, logoImageUrl, backgroundColour } = stationItem;
  return (
    <StationContainer alignItems="center">
      <Link href={`/stations/${slug}`}>
        <a>
          <LogoContainer backgroundColour={backgroundColour} style={{ cursor: 'pointer' }}>
            <TopPad />
            <Image src={logoImageUrl} alt={`${name} logo`} />
          </LogoContainer>
        </a>
      </Link>
      <Link href={`/stations/${slug}`} style={{ cursor: 'pointer' }}>
        <a>
          <Paragraph
            variant="l"
            ml="m"
            style={{ cursor: 'pointer' }}
          >
            {name}
          </Paragraph>
        </a>
      </Link>
    </StationContainer>
  );
};

Station.propTypes = {
  stationItem: shape({
    name: string,
    slug: string,
    logoImageUrl: string,
    backgroundColour: string,
  }).isRequired,
};

export default Station;
