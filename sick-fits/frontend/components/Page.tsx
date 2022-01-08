import React from 'react';

interface IPageProps {
  children: React.ReactNode;
}

const Page: React.FC<IPageProps> = ({ children }) => (
  <div>
    <h2>Page component</h2>
    {children}
  </div>
);

export default Page;
