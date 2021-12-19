import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
const {width, height} = Dimensions.get('window');
let data = [];
for (let i = 0; i < 30; i += 1) data.push(i);

export default function ScrollBrickItem() {
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {data.map(x => (
            <View key={x} style={styles.item}>
              {/* giving random margin to mismatch the width of item */}
              <Text
                style={[
                  styles.txt,
                  {marginHorizontal: Math.random() * (40 - 10) + 10},
                ]}>
                Some text
              </Text>
              {/* instead of random margin you can change the above text */}
            </View>
          ))}
        </View>
      </ScrollView>
      {data.map(item => (
        <View key={item} style={styles.bottomItem} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingHorizontal: 3,
    width: width * 2, // <- important
  },
  innerContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // <- try removing this
  },
  item: {
    padding: 10,
    paddingHorizontal: 15,
    margin: 3,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  txt: {color: '#fff'},
  bottomItem: {
    height: 100,
    backgroundColor: 'darkred',
    margin: 2,
  },
});
