/* eslint-disable react/no-danger */
import React from 'react';

function GTM() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.scaGtmDataLayer = window.scaGtmDataLayer || [];
          function gtag(){scaGtmDataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GTM_TAG}');
          ` }}
      />
      <script
        async
        src={`https://www.googletagmanager.com/gtm.js?id=${process.env.GTM_TAG}&l=scaGtmDataLayer`}
      />
    </>
  );
}

export default GTM;
