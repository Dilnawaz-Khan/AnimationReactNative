import React, {useRef} from 'react';
import {
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

let data = [];
for (let i = 0; i < 20; i += 1) data.push(i);

export default function SwipableList() {
  return (
    <ScrollView>
      {data.map(item => (
        <SwipableItem key={item} />
      ))}
    </ScrollView>
  );
}

function SwipableItem() {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
      onMoveShouldSetPanResponder: (e, g) => false,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
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
    <Animated.View
      style={[styles.item, {transform: pan.getTranslateTransform()}]}
      {...panResponder.panHandlers}>
      <Text style={styles.txt}>Swipe Left or Right</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: '100%',
    backgroundColor: '#193e82',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#fff',
    letterSpacing: 1,
  },
});
