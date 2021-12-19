import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
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

const boxWidth = 150;

const OpacityAnimatedd = () => {
  const [visible, setVisible] = useState(true);

  const animate = () => {
    LayoutAnimation.easeInEaseOut();
    setVisible(!visible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {visible && <View style={styles.innerBox} />}
      </View>
      <View style={styles.btn}>
        <Button onPress={animate} title={visible ? 'Scale Out' : 'Scale In'} />
      </View>
    </View>
  );
};

export default OpacityAnimatedd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
  },
  box: {
    alignSelf: 'center',
    width: boxWidth,
    height: boxWidth,
  },
  innerBox: {
    backgroundColor: '#456788',
    height: '100%',
    width: '100%',
  },
  btn: {
    paddingHorizontal: 50,
  },
});
