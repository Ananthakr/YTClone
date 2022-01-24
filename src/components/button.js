/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../styles';

export const Button = ({
  title,
  onPress = () => {},
  filled = true,
  backgroundColor = '',
  textColor,
  customBtnStyle,
  customTitleStyle,
  isLoading = false,
  textSize = 19,
  disabled = false,

  ...otherProps
}) => {
  return (
    <View style={{opacity: disabled ? 0.5 : 100}}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={!disabled && onPress}
        disabled={disabled}
        style={{
          backgroundColor: backgroundColor,
          borderWidth: filled ? 0 : 1,
          borderRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingHorizontal: 15,
          paddingVertical: 8,
          ...customBtnStyle,
          ...otherProps,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: textColor,
            fontSize: textSize,
            fontFamily: fonts.primaryBold,
            ...customTitleStyle,
          }}>
          {title}
        </Text>
        {isLoading && <ActivityIndicator size="small" color={colors.white} />}
      </TouchableOpacity>
    </View>
  );
};
