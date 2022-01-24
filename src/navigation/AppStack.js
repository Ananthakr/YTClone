import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_SCREEN} from './screenNames';
import HomeScreen from '../screens/App/HomeScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={HOME_SCREEN}>
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
