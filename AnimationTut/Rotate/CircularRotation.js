import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

export default function CircularAnimation() {
  const animated = useRef(new Animated.Value(0)).current;
  const rotate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotateOpposit = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });
  const transform = [{rotate: rotate}];
  const transform1 = [{rotate: rotateOpposit}];
  const animate = () => {
    animated.setValue(0);
    Animated.spring(animated, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
      speed: 2,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.item, {transform}]}>
        <Animated.View style={[styles.dot, {transform: transform1}]} />
      </Animated.View>
      <Button title="rotate" onPress={animate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    position: 'absolute',
    width: 50,
    height: 300, // this is the diameter of circle
  },
  dot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'darkred',
  },
});
