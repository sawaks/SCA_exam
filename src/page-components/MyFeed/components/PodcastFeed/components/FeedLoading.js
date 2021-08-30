import FeedCard from 'components/Card/FeedCard';
import Divider from 'components/Divider';
import React from 'react';

const FeedLoading = () => (
  <>
    {[{}, {}, {}, {}].map(() => (
      <span key={`${Math.random()}`}>
        <FeedCard loading />
        <Divider opacity={0.1} />
      </span>
    )
    )}
  </>

);

export default FeedLoading;
