import React, {useRef} from 'react';
import {StyleSheet, Text, View, Button, Animated} from 'react-native';

const boxWidth = 150;

const RotateAnimated = () => {
  const _rotate = useRef(new Animated.Value(0)).current;
  const rotate = _rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const animate = () => {
    _rotate.setValue(0);
    Animated.spring(_rotate, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, {transform: [{rotate}]}]} />
      <View style={styles.btn}>
        <Button onPress={animate} title={'rotate'} />
      </View>
    </View>
  );
};

export default RotateAnimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  box: {
    height: boxWidth,
    width: boxWidth,
    backgroundColor: '#ab0b00',
    alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: 50,
  },
});
