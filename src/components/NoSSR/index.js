import { useEffect, useState } from 'react';

const NoSSR = ({ children }) => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  });

  return canRender ? children : null;
};

export default NoSSR;
