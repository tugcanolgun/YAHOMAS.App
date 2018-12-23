import React, { Component } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import * as CON from './Cons';
import { ItemCards } from './common';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      'items': [],
      'purchased': [],
      'search': '',
    }
  }

  onSearchChange(text) {
    this.setState({'search': text});
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
      if (!item.name.includes(this.state.search)) {
        return (null);
      }
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
      <ScrollView>
        <View style={styles.searchViewStyle}>
          <TextInput
            keyboardType='default'
            placeholder='Search items'
            placeholderTextColor='#CCCCCC'
            autoCorrect={false}
            value={this.state.search}
            onChangeText={this.onSearchChange.bind(this)}
            style={styles.inputTextInputStyle}
          />
        </View>
          {this.renderItems()}
      </ScrollView>
    );
  }
}

const styles =  StyleSheet.create({
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

export default Items;
