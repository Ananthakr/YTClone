import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {AppContext} from '../context';
import SplashLike from '../screens/Auth/SplashLike';
// import {magic} from '../utils';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useState({
    isLoggedIn: false,
    userEmail: null,
  });

  async function checkLoginStatus() {
    try {
      // Ideally, a token validation check would happen here,
      // since we dont have a backend configured for this project
      // and sdk provided method user.isLoggedIn doesn't work properly for this environment,
      // hardcoding the status to false and let the magic link auth to happen
      // every time app is opened

      // const status = await magic.user.isLoggedIn();
      const status = false;
      setAppState({
        ...appState,
        isLoggedIn: status,
      });
      setIsLoading(false);
    } catch (err) {
      console.log('Error with Auth: ', err);
      setAppState({
        isLoggedIn: false,
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
      }}>
      <NavigationContainer>
        {isLoading ? (
          <SplashLike />
        ) : appState.isLoggedIn ? (
          <AppStack />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default AuthStatus;
