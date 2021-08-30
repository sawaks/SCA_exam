/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import Faq from './index';

export default {
  component: Faq,
  title: 'FAQ',
  parameters: {
    componentSubtitle: 'This in an example',
  },
};

const Div = styled.div`
  display: flex;
  height: calc(100vh - 26px);
  flex-direction: column;
  justify-content: space-between;
`;

const faqsMock = [
  {
    question: 'What is PodcastOne Australia?',
    answer: "PodcastOne Australia is the leading premium commercial podcast network.  Here you'll find a wide range of podcasts, by some of Australia’s most well-known and trusted hosts, to help you stay entertained, informed and educated. PodcastOne Australia create both branded and original podcast series designed to engage with Australian audiences.",
  },
  {
    question: 'Why do I need to register?',
    answer: 'You’ll need to register, for free, with us to listen to our podcast library. Once you’ve registered, we’ll ask you about your favourite categories, favourite shows and hosts so that we can showcase podcasts back to you in a simple and relevant way.',
  },
  {
    question: 'I was an existing user before the new app went live, why do I need to sign-up again?',
    answer: 'The PodcastOne app and its web counterpart are brand new. We’ve also removed the social login option.  This means we need to ask you to provide your email, gender and postcode one last time to create your account. The details you previously provided, such as your email address, will be deleted within 90 days.',
  },
  {
    question: 'Is there an offline mode?',
    answer: 'The offline mode is a feature currently supported on the PodcastOne app only. ',
  },
  {
    question: 'Is PodcastOne Australia service free?',
    answer: 'The PodcastOne Australia service is ad-funded the podcasts are free to access once you’ve signed up.',
  },
  {
    question: 'What are you collecting my data for?',
    answer: 'We are collecting your data so we can best serve content to you. For example, your postcode will help us serve you the relevant local news content from the area you live in. If you need local news from a different area, you can also add the selected local news so it will appear in your daily feed. If you’ve signed up to our Newsletter (upon registration or via the My Account section on the web or the app), we will get in touch with you to recommend new content based on your preferences.',
  },
  {
    question: 'What if I need additional help?',
    answer: 'For any questions, queries or app feature request, feel free to contact us using this link: https://www.podcastoneaustralia.com.au/contact-us',
  },
  {
    question: 'How do I listen to PodcastOne Australia podcasts?',
    answer: 'To get started simply go to the App Store or Google Play Store to download  the app for your device:\n\niOS: https://apps.apple.com/au/app/podcastone-australia/id1462845202\nAndroid: https://play.google.com/store/apps/details?id=au.com.podcastoneaustralia\n\nYou can also listen on our website: https://podcastoneaustralia.com.au\n',
  },
];

export const Default = () => (
  <Div>
    <Faq
      faqs={faqsMock}
      imageUrl=""
    />
  </Div>
);
