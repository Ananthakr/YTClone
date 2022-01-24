import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AUTH_SCREEN} from './screenNames';
import AuthScreen from '../screens/Auth/AuthScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={AUTH_SCREEN}>
      <Stack.Screen
        name={AUTH_SCREEN}
        component={AuthScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
