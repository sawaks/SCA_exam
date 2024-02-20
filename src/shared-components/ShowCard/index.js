import PropTypes from 'prop-types';
import styled from "styled-components";
import Image from "../Image";
import Header from "../Typography/Header";
import Paragraph from "../Typography/Paragraph";
import spacing from 'src/styling/spacing';
import screen from 'src/styling/screen';

const CardWrapper = styled.div`
  border-radius: 8px;
  padding: ${spacing.s};
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding-bottom: ${spacing.l};
`;

const CardGrid = styled.div`
display: grid;
grid-template-columns: 1fr;

@media (min-width: 10em) {
 grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile */

}

${screen.tablet} {
 grid-template-columns: repeat(3, 1fr); /* 3 columns on tablet */
}

${screen.desktop} {
 grid-template-columns: repeat(4, 1fr); /* 4 columns on desktop */
}
`;

function ShowCard(props) {
    return (
        <CardWrapper>
            <ImageWrapper>
                <Image src={props.imageUrl} alt={props.title} style={{ width: '100%', borderRadius: '8px' }} />
            </ImageWrapper>
            <ContentWrapper>
                <Header text={props.title} mt={spacing.s} linesToShow={1} />
                <Paragraph text={props.description} linesToShow={3} mt={spacing.s} transparent />
            </ContentWrapper>
        </CardWrapper>

    );
}

ShowCard.propTypes = {
    /** show title */
    title: PropTypes.string,
    /** show image*/
    imageUrl: PropTypes.string,
    /** show description text */
    description: PropTypes.string,
};



export { ShowCard, CardGrid };