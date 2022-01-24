import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {LogoSVG} from '../../assets';
import Container from '../../components/container';
import {colors} from '../../styles';

const SplashLike = () => {
  return (
    <Container>
      <StatusBar backgroundColor={colors.white} translucent />
      <View
        style={{
          height: '100%',
          alignItems: 'center',
        }}>
        <LogoSVG width={80} />
      </View>
    </Container>
  );
};

export default SplashLike;

const styles = StyleSheet.create({});
