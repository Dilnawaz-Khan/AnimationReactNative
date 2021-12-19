import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, Text, View} from 'react-native';

let data = [];
for (let i = 0; i < 50; i += 1) data.push(i);

export default function CustomScrollView() {
  const [srollViewHeight, setHeight] = useState(1);
  const [mainHeight, setMainHeight] = useState(1);
  let panValue = {x: 0, y: 0};
  const pan = useRef(new Animated.ValueXY(panValue)).current;
  useEffect(() => {
    pan.addListener(value => {
      panValue = value;
    });
  }, []);
  const scrolling = Animated.diffClamp(
    pan.y,
    srollViewHeight / 0 ? -srollViewHeight + mainHeight : 1,
    0,
  );
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({x: panValue.x, y: panValue.y});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        pan.flattenOffset();
        Animated.decay(pan, {
          velocity: {x: 0, y: g.vy},
          deceleration: 0.999,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;
  return (
    <View
      style={styles.container}
      onLayout={e => setMainHeight(e.nativeEvent.layout.height)}>
      <Animated.View
        style={[styles.scrollView, {transform: [{translateY: scrolling}]}]}
        {...panResponder.panHandlers}
        onLayout={e => setHeight(e.nativeEvent.layout.height)}>
        {data.map((x, i) => (
          <View key={x} style={styles.item}>
            <Text style={styles.index}>
              This is not a ScrollView / Flatlist - {i + 1}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  item: {
    height: 80,
    width: '100%',
    backgroundColor: '#444',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  index: {
    color: '#fff',
  },
});
