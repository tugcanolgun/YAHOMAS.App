import React, { Component } from 'react';
import Dialog, { DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      'visible': false,
    };
  }
  render() {
    const { children } = this.props;
    return (
      <View style={styles.containerStyle}>
        {/* <Button
          title="Show Dialog"
          onPress={() => {
            this.setState({ visible: true });
          }}
        /> */}
        <Dialog
          width={0.8}
          height={0.7}
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          dialogAnimation={
            new ScaleAnimation({
              toValue: 0, // optional
              useNativeDriver: true, // optional
            })
          }
        >
          <DialogContent>
            {children}
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  }
});
export { Popup };