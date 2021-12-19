import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
const {width} = Dimensions.get('window');
const barHeight = width * 0.6;
const barWidth = barHeight / 2.5;
const scaleRatio = {x: 0.3, y: 0.6};
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function IphoneVolume() {
  let inputRef = useRef();
  let volume = useRef(0.25).current;
  let animationValue = useRef({x: 0, y: barHeight * (1 - volume)}).current;
  const animtion = useRef(new Animated.ValueXY(animationValue)).current;
  const scale = useRef(new Animated.ValueXY(scaleRatio)).current;
  const translateX = scale.x.interpolate({
    inputRange: [scaleRatio.x, 1],
    outputRange: [barWidth / 4, -width / 2 + barWidth / 2],
  });
  const translateY = Animated.diffClamp(animtion.y, 0, barHeight);
  const textOpacity = scale.x.interpolate({
    inputRange: [scaleRatio.x, 1],
    outputRange: [0, 1],
  });
  useEffect(() => {
    animtion.addListener(val => {
      animationValue = val;
    });
    translateY.addListener(val => {
      volume = (1 - val.value / barHeight).toFixed(2);
      setVolume(volume);
    });
    return () => {
      animtion.removeAllListeners();
      translateY.removeAllListeners();
    };
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animtion.setOffset({x: 0, y: animationValue.y});
        animtion.setValue({x: 0, y: 0});
        manageScale(true);
      },
      onPanResponderMove: Animated.event([null, {dy: animtion.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        animtion.flattenOffset();
        manageScale(false);
      },
      onPanResponderTerminate: () => {
        manageScale(false);
      },
    }),
  ).current;
  const setVolume = val => {
    // do your custom operation here
    inputRef.current.setNativeProps({text: val.toString()});
  };
  const manageScale = expand => {
    Animated.spring(scale, {
      toValue: expand ? {x: 1, y: 1} : scaleRatio,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {transform: [{translateX}, {scaleX: scale.x}, {scaleY: scale.y}]},
        ]}
        {...panResponder.panHandlers}>
        <Animated.View style={[styles.innerBar, {transform: [{translateY}]}]} />
        <AnimatedTextInput
          editable={false}
          ref={inputRef}
          style={[styles.txt, {opacity: textOpacity}]}
          defaultValue={volume.toString()}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#eeeeee99',
  },
  bar: {
    height: barHeight,
    width: barWidth,
    borderRadius: barHeight / 10,
    position: 'absolute',
    backgroundColor: '#ccc',
    elevation: 2,
    overflow: 'hidden',
    zIndex: 0,
  },
  innerBar: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#fff',
  },
  txt: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
});
