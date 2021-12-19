import React, {useState} from 'react';
import {
  Button,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const status = [
  'status 1',
  'status 2',
  'status 3',
  'status 4',
  'status 5',
  'status 6',
  'status 7',
];
const activeColor = '#444';

export default function TrackingStatus() {
  const [activeIndex, setActive] = useState(0);
  const setActiveIndex = val => {
    LayoutAnimation.easeInEaseOut();
    setActive(val);
  };
  const marginLeft = (100 / (status.length - 1)) * activeIndex - 100 + '%';
  return (
    <View style={styles.constainer}>
      <Text style={styles.prop}>{activeIndex}</Text>
      <View style={styles.statusContainer}>
        <View style={styles.line}>
          <View style={[styles.activeLine, {marginLeft}]} />
        </View>
        {status.map((status, index) => (
          <View style={[styles.dot]} key={status}>
            <View
              style={[
                index <= activeIndex
                  ? {height: '100%', width: '100%'}
                  : {height: '40%', width: '40%'},
                {backgroundColor: activeColor, borderRadius: 20},
              ]}
            />
          </View>
        ))}
        <View style={styles.labelContainer}>
          {status.map((status, index) => (
            <Text
              key={status}
              numberOfLines={1}
              style={[index % 2 == 0 ? {top: 20} : {top: -20}, styles.label]}>
              {status}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.btns}>
        <Button
          title="prev"
          onPress={() => setActiveIndex(activeIndex - 0.5)}
          disabled={activeIndex <= 0}
        />
        <Button
          title="next"
          onPress={() => setActiveIndex(activeIndex + 0.5)}
          disabled={activeIndex >= status.length - 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 5,
    width: '100%',
    backgroundColor: '#ccc',
    position: 'absolute',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activeLine: {
    height: '100%',
    width: '100%',
    backgroundColor: activeColor,
    borderRadius: 5,
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  labelContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
  },
  prop: {
    marginBottom: 20,
    width: 100,

    textAlign: 'center',
  },
});
