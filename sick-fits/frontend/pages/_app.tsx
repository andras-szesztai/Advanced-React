/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/App';
import NProgress from 'nprogress';
import Router from 'next/router';

import '../components/styles/nprogress.css';

import Page from '../components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => (
  <Page>
    <Component {...pageProps} />
  </Page>
);

export default App;
