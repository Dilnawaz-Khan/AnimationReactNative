import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet, Text, View} from 'react-native';

export default function PanhandlerResetOne() {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;
  return (
    <View style={styles.container}>
      <View style={styles.line1} />
      <View style={styles.line2} />
      <Animated.View
        style={[styles.box1, {transform: [{translateX: pan.x}]}]}
      />
      <Animated.View
        style={[styles.box2, {transform: [{translateY: pan.y}]}]}
      />
      <Animated.View
        style={[styles.box, {transform: pan.getTranslateTransform()}]}
        {...panResponder.panHandlers}>
        <Text style={styles.txt}>MOVE</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#44006e',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#44006e',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    height: 10,
    width: 10,
    backgroundColor: '#44006e',
    position: 'absolute',
  },
  box2: {
    height: 10,
    width: 10,
    backgroundColor: '#44006e',
    position: 'absolute',
  },
  line1: {
    height: 1,
    width: '100%',
    backgroundColor: '#44006e',
    position: 'absolute',
  },
  line2: {
    height: '100%',
    width: 1,
    backgroundColor: '#44006e',
    position: 'absolute',
  },
  txt: {
    color: '#fff',
  },
});
