import React from 'react';
import ErrorBoundary from './src/components/errorBoundary';
import AuthStatus from './src/navigation';

const App = () => {
  return (
    <ErrorBoundary>
      <AuthStatus />
    </ErrorBoundary>
  );
};

export default App;
