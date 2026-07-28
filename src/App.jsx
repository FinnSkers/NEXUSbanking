import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import NavBar from './components/NavBar';
import BentoGrid from './components/BentoGrid';
import FinanceHub from './components/FinanceHub';
import TransactionsPage from './components/TransactionsPage';
import TransferView from './components/TransferView';
import CreditCard3D from './components/CreditCard3D';
import ProfileView from './components/ProfileView';
import LoginPage from './components/LoginPage';
import Toast from './components/Toast';
import { SkeletonDashboard } from './components/Skeleton';
import './App.css';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (user && showSkeleton) {
      const timer = setTimeout(() => setShowSkeleton(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [user, showSkeleton]);

  if (isLoading) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderContent = () => {
    if (showSkeleton && activeTab === 'overview') {
      return (
        <div className="tab-content" key="skeleton">
          <div className="tab-header">
            <h1>Good afternoon, {user.firstName}</h1>
            <p>Loading your financial data...</p>
          </div>
          <SkeletonDashboard />
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content" key="overview">
            <div className="tab-header">
              <h1>Good afternoon, {user.firstName}</h1>
              <p>Here's what's happening with your finances today.</p>
            </div>
            <BentoGrid />
          </div>
        );
      case 'finance':
        return (
          <div className="tab-content" key="finance">
            <FinanceHub />
          </div>
        );
      case 'transactions':
        return (
          <div className="tab-content" key="transactions">
            <TransactionsPage />
          </div>
        );
      case 'transfers':
        return (
          <div className="tab-content" key="transfers">
            <TransferView />
          </div>
        );
      case 'cards':
        return (
          <div className="tab-content" key="cards">
            <div className="tab-header" style={{ textAlign: 'center' }}>
              <h1>Your Card</h1>
              <p>Hover to interact · Click to flip</p>
            </div>
            <CreditCard3D />
          </div>
        );
      case 'profile':
        return (
          <div className="tab-content" key="profile">
            <ProfileView />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderContent()}
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
          <Toast />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
