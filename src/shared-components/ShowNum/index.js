import Header from "../Typography/Header";
import PropTypes from 'prop-types';


function ShowNum(props) {
    return (
        <Header text={`${props.productsNumber} Podcasts`} mt="m" mb="l" variant="s" />
    )
}

ShowNum.propTypes = {
    /** show number */
    productsNumber: PropTypes.number,
};

export default ShowNum;