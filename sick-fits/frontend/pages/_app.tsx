/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/App';

import Page from '../components/Page';

const App = ({ Component, pageProps }: AppProps) => (
  <Page>
    <Component {...pageProps} />
  </Page>
);

export default App;
