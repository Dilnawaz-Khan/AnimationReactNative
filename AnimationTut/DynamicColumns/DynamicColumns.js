import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
const {width} = Dimensions.get('screen');
let data = [];
for (let i = 0; i < 50; i += 1) data.push(i);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function DynamicColumns() {
  const [columns, setColumns] = useState(5);

  const setColumnCount = val => {
    LayoutAnimation.easeInEaseOut();
    setColumns(val);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map((item, i) => (
          <View
            key={item}
            style={[
              styles.item,
              {width: width / columns, height: width / columns},
            ]}>
            <Image
              style={StyleSheet.absoluteFill}
              source={{
                uri:
                  i % 2 == 0
                    ? 'https://preview.pixlr.com/images/800wm/356/2/356202449.jpg'
                    : 'https://img10.joybuy.com/img/jfs/t15409/82/798473600/206221/734b5e2a/5a38b0b0N3855343e.jpg.dpg',
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          title=" reduce  column "
          onPress={() => setColumnCount(columns - 1)}
          disabled={columns <= 1}
        />
        <Button
          title=" add  column "
          onPress={() => setColumnCount(columns + 1)}
          disabled={columns >= 20}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#7e9e0b',
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 5,
  },
});
