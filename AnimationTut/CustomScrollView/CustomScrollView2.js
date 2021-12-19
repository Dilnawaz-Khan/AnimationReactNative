import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {height} = Dimensions.get('screen');

let data = [];
for (let i = 0; i < 50; i += 1) data.push(i);

let panValue = {x: 0, y: 0};
let swiperValue = 0;
let _setInterval = null;
export default function CustomScrollView2() {
  const [srollViewHeight, setHeight] = useState(1);
  const [mainHeight, setMainHeight] = useState(-200);
  const pan = useRef(new Animated.ValueXY(panValue)).current;
  const swiperTranslate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    pan.addListener(value => {
      panValue = value;
    });
    swiperTranslate.addListener(data => {
      swiperValue = data.value;
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
          deceleration: 0.999, // <-- scrolling speed
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const panResponder1 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        _setInterval = setInterval(() => {
          Animated.decay(pan, {
            velocity: {x: 0, y: -swiperValue / (height / 5)},
            deceleration: 0.99,
            useNativeDriver: true,
          }).start();
        }, 16);
      },
      onPanResponderMove: Animated.event([null, {dy: swiperTranslate}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        if (_setInterval) {
          clearInterval(_setInterval);
        }
        swiperReset();
      },
      onPanResponderTerminate: () => {
        if (_setInterval) {
          clearInterval(_setInterval);
        }
        swiperReset();
      },
    }),
  ).current;
  const swiperReset = () =>
    Animated.spring(swiperTranslate, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
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
      <Animated.View
        style={[
          styles.swiper,
          {
            top: mainHeight / 2 - 20,
            transform: [{translateY: swiperTranslate}],
          },
        ]}
        {...panResponder1.panHandlers}>
        <Text style={styles.arrow}>▲</Text>
        <Text style={styles.arrow}>▼</Text>
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
  swiper: {
    height: 50,
    width: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: '#fff',
  },
});
