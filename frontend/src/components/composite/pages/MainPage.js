import React from 'react';
import PageHeader from '../panels/PageHeader';
import DashPanel from '../panels/DashPanel';

const MainPage = () => {
  return (
  <div>
    <PageHeader />
    <div id="content">
      <DashPanel />
    </div>
  </div>
)};

export default MainPage;