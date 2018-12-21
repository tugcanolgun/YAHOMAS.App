import React, { Component } from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';
import axios from 'axios';
import * as CON from './Cons';
import { ItemCards } from './common';
import { Actions } from 'react-native-router-flux';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      'items': [],
      'purchased': [],
    }
  }

  componentWillMount() {
    const { booking } = this.props;
    axios.get(CON.URL + CON.ITEMS)
      .then(response => {
        this.setState({'items': response.data});
      })
      .then(() => {
        return axios.get(CON.URL + CON.ITEMS + '/' + booking);
      })
      .then(response => {
        console.log('Purchased: ', response.data);
        this.setState({'purchased': response.data});
      })
      .catch(error => {
        console.log('Items could not be fecthed');
      })
  }

  renderItems() {
    const { booking, room, title } = this.props;
    return this.state.items.map(item => {
      var number = 0;
      var purchased_id = '';
      for (const [key, value] of Object.entries(this.state.purchased)) {
        if (value["item"] === item.id) {
          number += 1;
          purchased_id = value["id"]
        }
      }
      return (
        <ItemCards item={item} number={number} title={title} room={room} purchased_id={purchased_id} booking={booking} key={item.id}>
          {item.name}
        </ItemCards>
      );
    })
  }
  render() {
    const { booking, room } = this.props;
    return(
      <View>
          {this.renderItems()}
      </View>
    );
  }
}

export default Items;
