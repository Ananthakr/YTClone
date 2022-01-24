import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ErrorBoundary from './src/components/ErrorBoundary';
import AuthStatus from './src/navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ErrorBoundary>
      <AuthStatus />
    </ErrorBoundary>
  );
};

export default App;
