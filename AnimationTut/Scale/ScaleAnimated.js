import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, Animated, Button} from 'react-native';

const boxWidth = 100;

const ScaleAnimated = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const [scaled, setScaled] = useState(false);

  const animate = () => {
    Animated.spring(scale, {
      toValue: scaled ? 1 : 2,
      useNativeDriver: true,
    }).start();
    setScaled(!scaled);
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, {transform: [{scale}]}]} />
      <View style={styles.btn}>
        <Button onPress={animate} title={scaled ? 'Scale Out' : 'Scale In'} />
      </View>
      <Text></Text>
    </View>
  );
};

export default ScaleAnimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },
  box: {
    height: boxWidth,
    width: boxWidth,
    backgroundColor: '#348200',
    alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: 50,
  },
});
