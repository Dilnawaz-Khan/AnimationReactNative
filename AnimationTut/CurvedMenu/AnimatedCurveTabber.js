import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const btns = ['btn 1', 'btn 2', 'btn 3', 'btn 4', 'btn 5'];
const btnWidth = width / btns.length;
const activeColor = 'lightgreen';
const inactiveColor = 'white';
export default function AnimatedTabbarCurve() {
  const [active, setActive] = useState(0);
  const translateX = useRef(
    new Animated.Value((active * width) / btns.length),
  ).current;
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: active * btnWidth,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [active]);
  return (
    <View style={styles.flex}>
      <View style={styles.flex} />
      <View style={styles.btnContainer}>
        <Animated.View
          style={[styles.bgContainer, {transform: [{translateX}]}]}>
          <View style={styles.activeLeft}>
            <View style={styles.activeLeftInner} />
          </View>
          <View style={styles.activeBg} />
          <View style={styles.activeRight}>
            <View style={styles.activeRightInner} />
          </View>
        </Animated.View>
        {btns.map((btn, i) => (
          <TouchableOpacity
            key={btn}
            style={styles.btn}
            onPress={() => setActive(i)}>
            <Text>{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottom}>
        <Text>{active + 1}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  bottom: {
    height: height / 3,
    width: '100%',
    backgroundColor: activeColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: inactiveColor,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  bgContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    left: -btnWidth,
  },
  activeBg: {
    width: btnWidth,
    height: '100%',
    backgroundColor: activeColor,
    borderTopLeftRadius: btnWidth / 2,
    borderTopRightRadius: btnWidth / 2,
  },
  activeRight: {
    width: btnWidth,
    height: '100%',
    backgroundColor: activeColor,
  },
  activeRightInner: {
    ...StyleSheet.absoluteFill,
    backgroundColor: inactiveColor,
    borderBottomLeftRadius: btnWidth / 2,
  },
  activeLeft: {
    width: btnWidth,
    height: '100%',
    backgroundColor: activeColor,
  },
  activeLeftInner: {
    ...StyleSheet.absoluteFill,
    backgroundColor: inactiveColor,
    borderBottomRightRadius: btnWidth / 2,
  },
});
