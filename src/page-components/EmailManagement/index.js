import isEmpty from 'lodash/isEmpty';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from 'src/styles/theme';
import { LISTNR_META } from 'utilities/constants';
import Loading from '../../components/Loading';
import RenderForm from './Forms';

function EmailManagement() {
  const router = useRouter();
  const [view, setView] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isEmpty(router?.query?.mode)) {
      setLoading(false);
    }
    if (router?.query?.mode === 'verifyEmail') {
      setView('emailVerification');
      return;
    }
    if (router?.query?.mode === 'resetPassword') {
      setView('setNewPassword');
    }
  }, [router.query]);

  return (
    <main>
      <Head>
        <title>{LISTNR_META.pages.emailManagement.title}</title>
        <meta name="title" content={LISTNR_META.pages.emailManagement.title} />
        <meta name="description" content={LISTNR_META.pages.emailManagement.description} />
        <meta property="og:title" content={LISTNR_META.pages.emailManagement.title} />
        <meta property="og:description" content={LISTNR_META.pages.emailManagement.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} />
      </Head>
      <BackgroundGradient />
      <Loading
        loading={loading}
        render={() => (<RenderForm view={view} changeView={setView} />)}
      />
    </main>
  );
}

const BackgroundGradient = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: ${theme.backgroundGradient};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

export default EmailManagement;
