import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux';
import { AsyncStorage } from "react-native"
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import Items from './components/Items';
import * as CON from './components/Cons';
import axios from 'axios';


class RouterComponent extends Component {
  constructor() {
    super();
    this.state = { 'loggedIn': false }
  }
  componentWillMount() {
    var username = '';
    var password = '';
    AsyncStorage.getItem('username')
      .then( value => {
        username=value;
      })
      .then( () => {
        return AsyncStorage.getItem('password');
      })
      .then( value => {
        password=value;
      })
      .then(() => {
        if (username !== '' || username !== undefined && password !== '' || password !== undefined) {
          axios.post(CON.URL + CON.LOGIN, 
            {
              'username': username,
              'password': password
            })
            .then(response => {
              this.setState({'loggedIn': true});
              Actions.main();
              // Actions.items({'room': '102', 'booking': '7d86cb08-8c30-461d-80bf-e6a8aad7fe4f', 'room': 'ee4a7dd1-3865-49cd-b9d5-2e6915e98a0e', 'title': 'Room ' + '102'});
            })
            .catch(error => {
              console.log(error);
            })
        }
      })
      .catch(() => console.log('User is not logged in'));
  }

  render () {
    return <Router>
      <Scene key='root'>
        <Scene key='login' component={LoginForm} title='Login' hideNavBar initial />
        <Scene key='main' component={Main} title='Main' hideNavBar />
        <Scene key='items' component={Items} title='Room Service' renderBackButton={()=>{}} />
      </Scene>
    </Router>
  }
}

export default RouterComponent;
