import React from 'react';
import Header from './Header';

interface IPageProps {
  children: React.ReactNode;
}

const Page: React.FC<IPageProps> = ({ children }) => (
  <div>
    <Header />
    <h2>Page component</h2>
    {children}
  </div>
);

export default Page;
