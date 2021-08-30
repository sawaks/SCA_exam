import React, { useEffect } from 'react';
import { Form } from 'react-formio';
import Head from 'next/head';
import styled from 'styled-components';
import StyledForm from './styles';

// This is required to ensure IE 11 knows the width of the parent.
const StyledFormWrapper = styled.div`
  width: 100%;
`;
// If there are validation errors, scroll to the error message.
const scrollToError = () => {
  const getFirstErrorElement = document.getElementsByClassName('alert-danger')[0] || null;
  if (getFirstErrorElement) {
    getFirstErrorElement.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
};

/**
 * This component generate a form using react-formio. Bootstrap is a prerequisite for the formio renderer.
 * Bootstrap assets are hosted locally and delivered from the node server directly (it is cached by CDN after).
 * This is because of the following reasons:
 * 1) Next-css currently does not support the exclusion of a file. This causes an issue in the build process as
 *    it is not possible to parse .css files in both css-modules form and in basic css form. Delivering it directly bypasses
 *    the webpack/next build process.
 * 2) Including bootstrap in the <GlobalStyles> component would mean adding a lot of Bootstrap css regardless of whether a form is
 *    loaded or not. It is more efficient to request bootstrap assets only when a form is rendered.
 * 3) Hosting Bootstrap assets locally enables us to remove conflicting styles that are overriding our styles.
 *    In addition we can remove any styles not required, thereby reducing the size of the file downloaded.
 *
 * TODO: Minify the files and look into using Boostrap SASS files as a way to scope the css.
 *
 * This component only work on the client side. So the when importing this component remember to wrap it is inside nextjs's dynamic import
 * function. For example "const FormIO = dynamic(import('./components/FormIO'), { ssr: false });"
 *
 * Add a react hook to switch on/off the captcha
 * If formIO has a captcha, it will stay on top of the screen even the componet is off.
 */
function updateCaptcha(visibility) {
  const element = document.getElementsByClassName('grecaptcha-badge')[0] || null;
  if (element) {
    element.style.visibility = visibility;
  }
}

function FormIO(props) {
  useEffect(() => {
    updateCaptcha('visible');
    return () => updateCaptcha('hidden');
  });

  return (
    <StyledFormWrapper>
      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/formiojs@4.3.0/dist/formio.form.min.css" />
        <script src="https://storage.googleapis.com/sca-abnormally-pro-stingray.appspot.com/formio/sha256.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <StyledForm>
        <Form
          onError={() => scrollToError()}
          {...props}
        />
      </StyledForm>
    </StyledFormWrapper>
  );
}

export default FormIO;
