import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
// import {height} from '../../utility/commonStyles';
const height = '100%';
const {width} = Dimensions.get('screen');
const image = require('../../assets/images/FaceMask.jpeg');

let data = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function ItemPopup1() {
  const [layoutData, setData] = useState(null);
  return (
    <View>
      <FlatList
        data={data}
        contentContainerStyle={{paddingVertical: 20}}
        keyExtractor={item => item}
        renderItem={() => <RenderItem toggleModal={data => setData(data)} />}
        numColumns={2}
      />
      {layoutData !== null && (
        <ModalView layoutData={layoutData} close={() => setData(null)} />
      )}
    </View>
  );
}

function ModalView({layoutData, close}) {
  const {x, y, _width, _height} = layoutData;
  const animtion = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setExpanded(true);
    }, 10);
  }, []);
  const onRequestClose = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ),
      () => {
        close();
      },
    );
    setExpanded(false);
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dy: animtion.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        if (Math.abs(g.vy) > 2) {
          reset(true, g.vy > 0);
          return;
        }
        reset();
      },
      onPanResponderTerminate: () => {
        reset();
      },
    }),
  ).current;
  const reset = (closeModal, down) => {
    Animated.spring(animtion, {
      toValue: {x: 0, y: closeModal ? height * (down ? 1 : -1) : 0},
      bounciness: 0,
      useNativeDriver: true,
    }).start();
    if (closeModal) {
      setTimeout(() => {
        close();
      }, 200);
    }
  };
  return (
    <Modal visible onRequestClose={onRequestClose} transparent>
      <View style={[styles.center]} {...panResponder.panHandlers}>
        {expanded && (
          <Animated.View
            style={[StyleSheet.absoluteFill, {backgroundColor: '#000000aa'}]}
          />
        )}
        <Animated.View
          style={[
            expanded
              ? {
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                }
              : {
                  height: _height,
                  width: _width,
                  left: x,
                  top: y,
                  position: 'absolute',
                },
            {
              backgroundColor: '#ccc',
              overflow: 'hidden',
              transform: animtion.getTranslateTransform(),
            },
          ]}>
          <Image source={image} resizeMode="cover" style={styles.fill} />
          {expanded && (
            <View style={styles.close}>
              <Button title="close" onPress={onRequestClose} />
            </View>
          )}
          {expanded && (
            <Text style={styles.label}>Swipe up or down to dismiss</Text>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

class RenderItem extends Component {
  shouldComponentUpdate = () => false;
  onPress = () => {
    const {toggleModal} = this.props;
    this.itemRef.measureInWindow((x, y, _width, _height) => {
      toggleModal({
        x,
        y,
        _width,
        _height,
      });
    });
  };
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          ref={e => (this.itemRef = e)}
          style={{flex: 1, backgroundColor: '#ddd'}}
          onPress={this.onPress}
          onLongPress={this.onPress}
          activeOpacity={0.7}>
          <Image source={image} resizeMode="cover" style={styles.fill} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: width / 2,
    flex: 1,
    padding: 3,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  label: {
    color: '#fff',
    fontSize: 20,
    marginTop: 100,
  },
});
