import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box } from 'reflexbox';
import Button from 'components/Button';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const CTAAnimated = (cta) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);

  const { scrollY } = useViewportScroll();
  const opacticyAnim = useTransform(scrollY, [0, elementTop - 875, elementTop - 825], [0, 0, 1]);
  const yAnim = useTransform(scrollY, [0, elementTop - 875, elementTop - 825], [50, 50, 0]);

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);

  return (
    <Box width={[1]} pt={[0, 25]} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        style={{ y: yAnim, opacity: opacticyAnim }}
      >
        <Button
          as="a"
          link={{ as: '', href: { pathname: `/${cta.ctaUrl}` } }}
          text={cta.ctaText}
          variant="primary"
          maxWidthDesktop="234px"
          maxWidthMobile="234px"
          minWidthMobile="234px"
          onClick={() => addToDataLayer({
            event: gtm.homepageBrowse2,
          })}
        />
      </motion.div>
    </Box>
  );
};

export default CTAAnimated;
