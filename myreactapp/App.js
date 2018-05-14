
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  StatusBar
} from 'react-native';

import {TabNavigator, StackNavigator} from 'react-navigation';

import AppHome from './src/components/AppHome';
import About from './src/components/About';
import Mission from './src/components/Mission';

const InfoNav = StackNavigator({
  AppHome: { screen: AppHome},
  Mission: { screen: Mission}
}, {
  mode: 'modal'
})

const TabNav = TabNavigator({
  InfoNav: { screen: InfoNav},
  About: { screen: About}
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#0066cc'
  },
  ...TabNavigator.Presets.iOSBottomTabs
})

export default class App extends Component {
  render() {

    const items = [
      "Hello World",
      "Bonjour le monde",
      "Hallo Welt",
      "Ciao mondo"
    ]

    return (
      <TabNav />
      /*
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            MyReactApp
          </Text>
        </View>
        <AppHome />
      </View>
      */
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#343212'
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff'
  }
});
