import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {Form, Item, Input, Button, Text as NBText} from 'native-base';

export default class Mission extends Component {

    state = {
        text: ''
    }

    onHit = () => {
        if (this.state.text !== ''){
            console.log("Text: ", this.state.text)
        } else {
            console.log("Enter some text")
        }
        const nav = this.props.navigation
        nav.state.params.saveLang(this.state.lang)
        nav.goBack()
    }

    setText = (text) => {
        if (text.length === 3){
            text = `(${text})`
        }
        if (text.length === 8){
            text = `${text}-`
        }
        this.setState({text})
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.chapter1}>
                About
            </Text>
            <TextInput style={styles.input} 
            onChangeText={this.setText}
            value={this.state.text}/>
            <TouchableOpacity onPress={this.onHit}>
                <Text style={styles.buttonText}>Hit</Text>
            </TouchableOpacity>
            <Form>
                <Item>
                    <Input placeholder="Language" 
                    onChange={e => this.setState({ lang: e.nativeEvent.text})}
                    value={this.state.lang} />
                </Item>
                <Button style={styles.buttonText} onPress={this.onHit}>
                    <NBText>Add Task</NBText>
                </Button>
            </Form>
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
    input: {
        padding: 10,
        borderWidth: 1,
        alignSelf: 'stretch',
    },
    buttonText: {
        padding:10,
        backgroundColor: '#435489',
    }
  });
  
