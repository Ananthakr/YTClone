import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, fonts} from '../styles';

export const InputText = ({
  placeholder,
  onChange,
  customTxtInputStyle,
  customInputStyle,
  label,
  customLabelStyle,
  onPressIcon,
  value,
  errorText = '',
  rightElement,
  ...otherTextInputProps
}) => {
  return (
    <>
      <Text style={{...styles.labelStyle, ...customLabelStyle}}>{label}</Text>
      <View style={{...styles.textInputStyle, ...customTxtInputStyle}}>
        <TextInput
          onChangeText={onChange}
          placeholder={placeholder}
          style={[styles.textInputInnerStyle, customInputStyle]}
          value={value}
          {...otherTextInputProps}
        />
        {rightElement && rightElement}
      </View>
      {errorText.length > 0 ? (
        <Text style={styles.errorStyle}>{errorText}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: colors.greyBDBDBD,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInputInnerStyle: {
    height: 48,
    width: '100%',
    color: colors.grey0D0D0D,
    fontSize: 16,
    fontFamily: fonts.primaryMedium,
    paddingLeft: 4,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
    color: colors.grey404040,
  },
  errorStyle: {
    color: colors.redC7261E,
    fontSize: 13,
    marginTop: 6,
  },
});
