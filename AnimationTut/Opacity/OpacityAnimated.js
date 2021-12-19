import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Animated, Button} from 'react-native';

const boxWidth = 150;
const OpacityAnimated = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(false);

  const animate = () => {
    Animated.spring(opacity, {
      toValue: visible ? 0 : 1,
      useNativeDriver: true,
    }).start();
    setVisible(!visible);
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, {opacity}]} />
      <View style={styles.btn}>
        <Button
          onPress={animate}
          title={visible ? 'Opacity Out' : 'Opacity In'}
        />
      </View>
    </View>
  );
};

export default OpacityAnimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },
  box: {
    height: boxWidth,
    width: boxWidth,
    backgroundColor: '#34aaaa',
    alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: 50,
  },
});
