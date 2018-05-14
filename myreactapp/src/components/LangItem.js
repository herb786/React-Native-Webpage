import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {Icon} from 'native-base';

export default class LangItem extends Component {

    state = {
        highlighted: false
    }

    /*
    constructor(props) {
        super(props)
        this.state = {
            completed: props.title == 'My React Android App'
        }
    }
    */

    toggleTile = () => {
        this.props.updateLang(
            this.props.item.id,
            !this.props.item.highlighted
        )
        //this.setState({ highlighted: !this.state.highlighted})
    }

    deleteLang = () => {
        this.props.deleteLang(
            this.props.item.id
        )
        //this.setState({ highlighted: !this.state.highlighted})
    }
    render() {
        const item = this.props.item
      return (
          <TouchableOpacity onPress={this.toggleTile} style={styles.test}>
            <Icon name={item.highlighted ? 'checkmark-circle' : 'radio-button-off'}/>
            <Text style={[styles.chapter1, {
                backgroundColor: (item.highlighted) ? 'grey' : 'transparent'
            }]}>
                {item.lang}
            </Text>
            <TouchableOpacity onPress={this.deleteLang}>
                <Icon name="trash" style={{color: "red", paddingRight: 10}}/>
            </TouchableOpacity>
          </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
    chapter1: {
      textAlign: 'center',
      color: '#345676',
      margin: 10,
      flex: 1
    },
    test: {
        backgroundColor: '#223322',
        borderColor: '#ff0011',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
  });
  
