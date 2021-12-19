import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {width} = Dimensions.get('window');

const headers = [
  'header1',
  'header header 2',
  'header3',
  'header header4',
  'header5',
  'header header6',
  'header7',
  'header header8',
  'header9',
  'header10',
];

export default function ScrollableTabViewPager1() {
  const [headerWidths, setWidths] = useState([]);
  const [active, setActive] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const barTranslate = Animated.multiply(scrollX, -1);
  const barTranslate1 = useRef(new Animated.Value(0)).current;
  const headerScrollView = useRef();
  const itemScrollView = useRef();
  useEffect(() => {
    let leftOffset = 0;
    for (let i = 0; i < active; i += 1) {
      leftOffset += headerWidths[i];
    }
    headerScrollView.current.scrollToIndex({index: active, viewPosition: 0.5});
    Animated.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [active]);
  const onPressHeader = index => {
    itemScrollView.current.scrollToIndex({index});
    LayoutAnimation.easeInEaseOut();
    setActive(index);
  };
  const onMomentumScrollEnd = e => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (active != newIndex) {
      LayoutAnimation.easeInEaseOut();
      setActive(newIndex);
    }
  };
  const onHeaderLayout = (width, index) => {
    let newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={headers}
          ref={headerScrollView}
          keyExtractor={item => item}
          horizontal
          style={styles.headerScroll}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <View style={[styles.headerBar, {}]} />}
          renderItem={({item, index}) => (
            <View style={{overflow: 'hidden'}}>
              <TouchableOpacity
                onLayout={e =>
                  onHeaderLayout(e.nativeEvent.layout.width, index)
                }
                onPress={() => onPressHeader(index)}
                key={item}
                style={[
                  styles.headerItem,
                  {backgroundColor: active == index ? '#2863a6' : '#1e4d82'},
                ]}>
                <Text style={{color: '#fff'}}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Animated.View
          style={[
            styles.headerBar,
            {
              width: headerWidths[active],
              transform: [
                {translateX: barTranslate},
                {translateX: barTranslate1},
              ],
            },
          ]}
        />
      </View>
      <FlatList
        data={headers}
        ref={itemScrollView}
        keyExtractor={item => item}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item, index}) => (
          <View key={item} style={styles.mainItem}>
            <Text style={{color: '#fff'}}>
              Animation happens once scrolling ended
            </Text>
            <Text style={{color: '#fff'}}>card {index + 1}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerScroll: {
    flexGrow: 0,
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mainItem: {
    width: width,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerBar: {
    height: 3,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 1,
  },
});
