import styled from 'styled-components';
import { Box } from '@rebass/grid';
import spacing from 'styling/spacing';
import screen from 'styling/screen';

export const StyledCategoryShows = styled(Box)`
   background-color: ${props => props.theme.dark};
   border-radius: 26px;
   padding: ${spacing.m};

   ${screen.tablet} {
    padding: 15px;
  }
`;

export const StyledBox = styled(Box)`
   max-width: 100%;

  ${screen.mobile} {
    max-width: 480px;
  }

  ${screen.laptop} {
    max-width: 800px;
  }
`;
export const TextWrapper = styled.div`
   margin-bottom: 12px;

   ${screen.mobile} {
    margin-bottom: 0;
  }
`;
