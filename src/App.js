import React, {Component} from 'react';
import { SafeAreaView } from 'react-native';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Router />
      </SafeAreaView>
    );
  }
}

export default App;
