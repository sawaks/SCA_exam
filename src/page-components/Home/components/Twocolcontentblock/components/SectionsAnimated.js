import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const SectionsAnimated = (contentItems) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);
  return (
    <Flex
      flexWrap="wrap"
      pt={[25, 50]}
    >
      {contentItems?.map((item, i) => {
        const firstReveal = i % 2 === 0 ? elementTop - 1225 : elementTop - 1200;
        const secondReveal = i % 2 === 0 ? elementTop - 1125 : elementTop - 1100;
        const checkRow = i < 2 ? firstReveal : secondReveal;
        const opacticyAnim = useTransform(scrollY, [0, checkRow, elementTop - 675], [0, 0, 1]);
        const yAnim = useTransform(scrollY, [0, checkRow, elementTop - 675], [150, 150, 0]);
        return (
          <Box width={[1, 1 / 2]} pr={[0, 2, 3]} ref={ref} key={item.title}>
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              style={{ y: yAnim, opacity: opacticyAnim }}
            >
              <StyledSection>
                <Header
                  as="h2"
                  variant="l"
                  mb="m"
                  mt="m"
                  text={item.title}
                />
                <Paragraph
                  variant="m"
                  text={item.description}
                  mb="l"
                  mr="l"
                  transparent
                />
              </StyledSection>
            </motion.div>
          </Box>
        );
      })}
    </Flex>
  );
};

const StyledSection = styled(Box)`
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

export default SectionsAnimated;
