
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Image,
  Platform
} from 'react-native';

import {Button, Text as NBText, Segment} from 'native-base';

import LangItem from './LangItem';

import Translation from '../images/translation.png'

import {items} from '../lib/api'

export default class AppHome extends Component {

    static navigationOptions = {
        header: null,
        tabBarIcon: ({tintColor}) => 
            <Image 
            style={[styles.icon, {tintColor}]} 
            source={Translation} />,
        tabBarLabel: 'Langs'
    }

    state = {
        items : null,
        filter: 'All'
    }


    goToMission = () => {
        this.props.navigation.navigate('Mission', {saveLang: this.saveLang})
    }

    saveLang = (newLang) => {
        /*
        const lang = {
            id: new Date().getTime(),
            lang: newLang,
            highlighted: false
        }
        this.setState({
            items:[...this.state.items, lang]
        })
        */
       const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')

        fetch("http://192.168.100.102:3000/items.json", {
            method: 'POST',
            headers,
            body: JSON.stringify({
                lang: newLang
            })
        })
        .then(response => response.json())
        .then(json => {
            this.setState({items: json})
        })
    }

    componentDidMount() {
        fetch("http://192.168.100.102:3000/items.json")
        .then(response => response.json())
        .then(items => {
           //console.log("Items", items)
           this.setState({items})
        })
        /*
        setTimeout(()=>{
            const newLangs = [
                "Hello World",
                "Bonjour le monde",
                "Hallo Welt",
                "Ciao mondo"
              ]
            this.setState({
                items: newLangs
            })
        }, 2000)
        */
    }

    updateLang = (id, highlighted) => {
        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')

        fetch("http://192.168.100.102:3000/items.json", {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                id,
                highlighted
            })
        })
        .then(response => response.json())
        .then(json => {
            this.setState({items: json})
        })

    }

    deleteLang = (id) => {
        /*
        const headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')

        fetch("http://192.168.100.102:3000/items.json", {
            method: 'DELETE',
            headers,
            body: JSON.stringify({
                id
            })
        })
        .then(response => response.json())
        .then(json => {
            this.setState({items: json})
        })
        */
       items('DELETE', {id})
       .then(json => {
            this.setState({items: json})
        })

    }

    filteredItems = () => {
        if (this.state.filter === 'Lang'){
            return this.state.items.filter(i => {
                return !i.highlighted
            })
        }
        if (this.state.filter === 'Highlighted'){
            return this.state.items.filter(i => {
                return i.highlighted
            })
        }
        return this.state.items
    }
   

  render() {

    const itemz = [
      "Hello World",
      "Bonjour le monde",
      "Hallo Welt",
      "Ciao mondo"
    ]

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Segment style={{backgroundColor: '#ccc'}}>
                <Button first 
                active={this.state.filter === 'All'}
                onPress={()=>this.setState({filter: 'All'})}>
                    <NBText>All</NBText>
                </Button>
                <Button 
                active={this.state.filter === 'Lang'}
                onPress={()=>this.setState({filter: 'Lang'})}>
                    <NBText>Lang</NBText>
                </Button>
                <Button last 
                active={this.state.filter === 'Highlighted'}
                onPress={()=>this.setState({filter: 'Highlighted'})}>
                    <NBText>Highlighted</NBText>
                </Button>
            </Segment>
        </View>
        {
            /*
          items.map((item, index) => {
            return <LangItem title={item} key={index}/>
          })
          */
        }
        {
            !this.state.items && <ActivityIndicator
                size="large"
                color="#2212ff"
                style={{margin: 20}}            
            />
        }
        <FlatList
          //data={this.state.items}
          data={this.filteredItems()}
          style={styles.content}
          renderItem={(row) => {
            return <LangItem item={row.item} 
            updateLang={this.updateLang}
            deleteLang={this.deleteLang}/>
          }}
          keyExtractor={item => item.id}
        />
        <View style={styles.footer}>
            <Button onPress={this.goToMission}>
                <NBText style={
                    Platform.select({
                        ios: { minWidth: 100},
                        android: { width: 200, textAlign: 'center'}
                    })
                }>Mission</NBText>
            </Button>
        </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  chapter1: {
    flex: 1,
    textAlign: 'center',
    color: '#345676',
    margin: 10,
  },
  content: {
    flex: 1,
    alignSelf: 'stretch'
  },
  header: {
    padding: 10,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: '#343212'
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff'
  },
  footer: {
      padding: 20,
      justifyContent: 'flex-end',
      flexDirection: 'row'
  },
  icon: {
      height: 24,
      resizeMode: 'contain'
  }
});
