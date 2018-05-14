import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class About extends Component {

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.chapter1}>
                About for ANDROID
            </Text>
      </View>
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
    chapter1: {
      textAlign: 'center',
      color: '#345676',
      margin: 10,
    },
  });
  
