import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const {width} = Dimensions.get('window');
const boxWidth = 100;

const TranslatedAnimatedd = () => {
  const [onRight, setOnRight] = useState(false);
  const animate = () => {
    LayoutAnimation.easeInEaseOut();
    setOnRight(!onRight);
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, {marginLeft: onRight ? width - boxWidth : 0}]}
      />
      <View style={styles.btn}>
        <Button
          onPress={animate}
          title={onRight ? 'Move Left' : 'Move Right'}
        />
      </View>
    </View>
  );
};

export default TranslatedAnimatedd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },
  box: {
    height: boxWidth,
    width: boxWidth,
    backgroundColor: '#a18900',
  },
  btn: {
    paddingHorizontal: 50,
  },
});
