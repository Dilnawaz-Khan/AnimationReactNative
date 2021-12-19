import React, {useRef} from 'react';
import {
  Animated,
  Button,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function PanhandlerContinuos() {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({x: pan.x._value, y: pan.y._value});
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
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
      <View style={styles.reset}>
        <Button title="reset" onPress={() => pan.setValue({x: 0, y: 0})} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#009ba1',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#009ba1',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    height: 10,
    width: 10,
    backgroundColor: '#009ba1',
    position: 'absolute',
  },
  box2: {
    height: 10,
    width: 10,
    backgroundColor: '#009ba1',
    position: 'absolute',
  },
  line1: {
    height: 1,
    width: '100%',
    backgroundColor: '#009ba1',
    position: 'absolute',
  },
  line2: {
    height: '100%',
    width: 1,
    backgroundColor: '#009ba1',
    position: 'absolute',
  },
  txt: {
    color: '#fff',
  },
  reset: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
