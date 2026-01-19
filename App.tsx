
import React, { useState } from 'react';
import { Page } from './types';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FieldCenterPage from './pages/FieldCenterPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.LOGIN:
        return <LoginPage onLogin={() => navigateTo(Page.DASHBOARD)} onRegister={() => navigateTo(Page.REGISTER)} />;
      case Page.REGISTER:
        return <RegisterPage onBack={() => navigateTo(Page.LOGIN)} />;
      case Page.DASHBOARD:
        return <DashboardPage onNavigate={navigateTo} />;
      case Page.FIELD_CENTER:
        return <FieldCenterPage onNavigate={navigateTo} />;
      default:
        return <LoginPage onLogin={() => navigateTo(Page.DASHBOARD)} onRegister={() => navigateTo(Page.REGISTER)} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
};

export default App;
