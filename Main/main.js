import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {DrawerContent} from './DrawerContent';

import TranslatedAnimated from '../AnimationTut/Translate/TranslatedAnimated';

const Drawer = createDrawerNavigator();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <NavigationContainer independent={true}>
        {this.state.updateScreen === true ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen
              options={{headerShown: false}}
              name="TranslatedAnimated"
              component={TranslatedAnimated}
            />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    );
  }
}
