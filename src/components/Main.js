import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, TextInput, Image, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
// import { ThemeProvider } from 'react-native-elements';
import { Rooms, Button } from './common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import * as COLOR from './common/Colors';
import * as CON from './Cons';
import { Actions } from 'react-native-router-flux';

var width = Dimensions.get('window').width; //full width

class Main extends Component {
  constructor() {
    super();
    this.state = {
      'error': '',
      'rooms': [],
      'bookings': [],
      'cleanings': [],
      'search': ''
    }
  }
  logOut() {
    AsyncStorage.clear();
    Actions.login();
  }
  onSearchChange(text) {
    this.setState({'search': text});
  }
  componentWillMount() {
    axios.get(CON.URL + CON.ROOMS)
      .then(response => {
        // console.log('rooms', response.data);
        this.setState({'rooms': response.data, 'error': ''})
      })
      .then(() => {
        return axios.get(CON.URL + CON.CLEANING);
      })
      .then(response => {
        this.setState({'cleanings': response.data});
      })
      .then( () => {
        return axios.get(CON.URL + CON.BOOKINGS)})
      .then(response => {
        this.setState({'bookings': response.data, 'error': ''})
      })
      .catch(error => {
        console.log(error);
        this.setState({'error': error})
      })
  }
  renderRooms() {
    var today = new Date().toJSON().slice(0,10);
    return this.state.rooms.map(room => {
      var booking = false;
      var bookingId = '';
      var cleaning = false;
      if (!room.room_number.includes(this.state.search)) {
        return (null);
      }
      for (const [key, value] of Object.entries(this.state.bookings)) {
        if (value["room"]["id"] === room.id) {
          booking = true;
          bookingId = value["id"];
          break;
        }
      }
      for (const [key, value] of Object.entries(this.state.cleanings)) {
        if (value["room"] === room.id) {
          if (today === value['cleaning_time']) {
            cleaning = true;
            break;
          }
        }
      }
      if (booking && cleaning) {
        return(
          <Rooms key={room.id} active bookingId={bookingId} cleaning id={room.id}>
            {room.room_number}
          </Rooms>
        );
      } else if (booking && !cleaning) {
        return (
          <Rooms key={room.id} active bookingId={bookingId} id={room.id}>
            {room.room_number}
          </Rooms>
        );
      } else if (!booking && cleaning) {
        return (
          <Rooms key={room.id} cleaning id={room.id}>
            {room.room_number}
          </Rooms>
        );
      }
      return (
        <Rooms key={room.id} id={room.id}>
          {room.room_number}
        </Rooms>
      );
    }
  );
  }
  render() {
    return(
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.threeView}>
          <View style={{ flex: 0.2 }}>
          <Text></Text>
          </View>
          <View style={styles.viewLogoStyle}>
            <Image 
              style={styles.logoStyle}
              source={require('../static/logo.png')} 
              />
          </View>
          <View style={{ flex: 0.2, justifyContent: 'center' }}>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginRight: 15, }}>
              <Text></Text>
                <TouchableOpacity onPress={this.logOut.bind(this)}>
                  <Icon
                    name='logout'
                    size={30}
                    color='#ccc'
                  />
                </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.searchViewStyle}>
          <TextInput
            keyboardType='default'
            placeholder='Search rooms'
            placeholderTextColor='#CCCCCC'
            autoCorrect={false}
            value={this.state.search}
            onChangeText={this.onSearchChange.bind(this)}
            style={styles.inputTextInputStyle}
          />
        </View>
        {this.renderRooms()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  threeView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewLogoStyle: {
    width: width,
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
    padding: 10,
    flex: 0.6
  },
  roomTitleStyle: {
    color: COLOR.TEXT_DARK,
    fontSize: 28,
  },
  searchViewStyle: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  inputTextInputStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#BBBBBB',
    marginBottom: 5,
    paddingLeft: 20,
    fontSize: 20,
  },
});

export default Main;