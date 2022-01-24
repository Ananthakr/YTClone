import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {colors} from '../styles';

/**
 * SafeAreaView doesnt support padding as it being used internally,
 * using an extra View wrapper to achieve needed padding.
 * Ref. https://github.com/facebook/react-native/issues/22211
 */
const Container = ({
  children,
  customStyle,
  paddingHorizontal = 20,
  backgroundColor,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor ? backgroundColor : colors.white,
        ...customStyle,
      }}>
      <View style={{paddingHorizontal: paddingHorizontal}}>{children}</View>
    </SafeAreaView>
  );
};

export default Container;
