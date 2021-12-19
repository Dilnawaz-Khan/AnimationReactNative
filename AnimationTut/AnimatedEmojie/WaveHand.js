import React, {useRef} from 'react';
import {Animated, Button, Easing, StyleSheet, View} from 'react-native';

export default function WaveHand() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotate = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 10],
    outputRange: [
      '0deg',
      '14deg',
      '-8deg',
      '14deg',
      '-4deg',
      '10deg',
      '0deg',
      '0deg',
    ],
  });
  const animate = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 10,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 2500,
    }).start();
  };
  return (
    <View style={styles.conatainer}>
      <Animated.Text style={[styles.wave, {transform: [{rotate}]}]}>
        👋
      </Animated.Text>
      <Button title="wave" onPress={animate} />
    </View>
  );
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    fontSize: 60,
    paddingBottom: 25,
    paddingRight: 25,
  },
});
