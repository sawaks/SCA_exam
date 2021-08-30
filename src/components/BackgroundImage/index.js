import React from 'react';
import { Flex } from 'components/Grid';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';

const ratios = {
  '16by9': '56.25%',
  '4by3': '75%',
  '3by2': '66.66%',
  '1by1': '100.00%',
};

function BackgroundImage({ src, visible, alt, backgroundSize, children, ...props }) {
  /* If there is a sinleRatio value and ratios has the singleRatio property then return ratios[] based on the singleRatio value, otherwise return customRatio
     But if customRation is undefined then return null  */
  const hasRatio = props.singleRatio && Object.prototype.hasOwnProperty.call(ratios, props.singleRatio) ? ratios[props.singleRatio] : props.customRatio;
  if (src) {
    return (
      <BackgroundImageWithSrc
        src={src}
        visible={visible}
        title={alt}
        backgroundSize={backgroundSize}
        flexDirection="column"
        justifyContent="flex-end"
        hasRatio={hasRatio || null}
      >
        {children}
      </BackgroundImageWithSrc>
    );
  }
  return (
    <BackgroundImageWithoutSrc title={alt} flexDirection="column" justifyContent="flex-end" hasRatio={hasRatio || null}>
      {children}
    </BackgroundImageWithoutSrc>
  );
}

const BackgroundImageWithSrc = styled(Flex)`
  background: ${props => (props.visible ? `url(${props.src})` : props.theme.LEGACY_backgroundImage)} no-repeat center;
  background-size: ${props => props.backgroundSize};
  width: 100%;
  height: 100%;
  padding: ${props => (props.hasRatio ? 0 : spacing.m)};
  padding-top: ${props => props.hasRatio || spacing.m};
  transition: opacity .2s ease-in;
  opacity: ${props => (props.visible ? 1 : 0)};
`;

const BackgroundImageWithoutSrc = styled(Flex)`
  background: ${props => props.theme.LEGACY_backgroundImage};
  width: 100%;
  height: 100%;
  padding: ${spacing.m};
  padding-top: ${props => props.hasRatio || spacing.m};
`;

BackgroundImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  backgroundSize: PropTypes.oneOf(['cover', 'contain', '102%', '100%']),
  children: PropTypes.node,
  /* Set this prop if the image is to maintain its ratio. */
  singleRatio: PropTypes.oneOf(['16by9', '4by3', '3by2', '1by1', '']),
  visible: PropTypes.bool.isRequired,
  /* Set this prop if the image has custom ratio rate otherwise use normal ratio */
  customRatio: PropTypes.string,
};

BackgroundImage.defaultProps = {
  src: '',
  alt: '',
  backgroundSize: 'cover',
  children: null,
  singleRatio: '',
  customRatio: '',
};

export default BackgroundImage;
