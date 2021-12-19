import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const boxWidth = 100;

const ScaleAnimatedd = () => {
  const [scaled, setScaled] = useState(false);

  const animate = () => {
    LayoutAnimation.easeInEaseOut();
    setScaled(!scaled);
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            height: scaled ? boxWidth * 2 : boxWidth,
            width: scaled ? boxWidth * 2 : boxWidth,
          },
        ]}
      />
      <View style={styles.btn}>
        <Button onPress={animate} title={scaled ? 'Scale Out' : 'Scale In'} />
      </View>
    </View>
  );
};

export default ScaleAnimatedd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },
  box: {
    backgroundColor: '#444',
    alignSelf: 'center',
  },
  btn: {
    paddingHorizontal: 50,
  },
});
