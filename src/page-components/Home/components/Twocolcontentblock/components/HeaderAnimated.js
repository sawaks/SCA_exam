import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import { Box } from 'reflexbox';
import Header from 'components/Typography/Header';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const HeaderAnimated = (title, subTitle) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);

  const { scrollY } = useViewportScroll();
  const yAnim = useTransform(scrollY, [elementTop - 1875, elementTop - 775], [100, 0]);
  const yAnimBottom = useTransform(scrollY, [elementTop - 1275, elementTop - 635], [120, 0]);

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);

  return (
    <>
      <StyledHeader ref={ref}>
        <Border />
        <motion.div
          initial={{ y: 100 }}
          style={{ y: yAnim }}
        >
          <Header as="h2" variant="m" mb="l" mt="l" text={subTitle} />
        </motion.div>
      </StyledHeader>
      <StyledHeader ref={ref}>
        <motion.div
          initial={{ y: 100 }}
          style={{ y: yAnimBottom }}
        >
          <Header as="h1" variant="display" text={title} />
        </motion.div>
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled(Box)`
  position: relative;
  overflow: hidden;
  ${screen.md} {
    h1 {
      line-height: 52px;
    }
  }
  h2 {
    color: ${props => props.theme.milkPunch};
  }
`;

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 70px;
  height: 6px;
  background-color: ${props => props.theme.milkPunch};
  border-radius: 3px;
`;

export default HeaderAnimated;
