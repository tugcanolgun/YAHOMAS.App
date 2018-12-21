import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as COLOR from './Colors';
import * as CON from '../Cons';
import { Dimensions } from "react-native";
import axios from 'axios';
import Dialog, { DialogContent, ScaleAnimation, DialogButton } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode';
import { Actions } from 'react-native-router-flux';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'qr': false,
      'nfc': false,
      'cleaning': false
    };
  }
  sendCleaning(id) {
    axios.post(CON.URL + CON.CLEANING, {'room': id})
      .then(response => {
        Actions.main();
      })
      .catch(error => {
        console.log(error);
      })
  }
  renderThis(active, icon, cleaning) {
    const size = 30;
    const { children, id, bookingId, room } = this.props;
    if (active) {
      if (icon == 'qrcode-scan') {
        return(
          <TouchableOpacity onPress={() => this.setState({'qr': true})}>
            <Icon
              name={icon}
              size={size}
              color={COLOR.TEXT_DARK}
            />
          </TouchableOpacity>
        );
      } else if (icon === 'nfc') {
        return(
          <TouchableOpacity onPress={() => this.setState({'nfc': true})}>
            <Icon
              name={icon}
              size={size}
              color={COLOR.TEXT_DARK}
            />
          </TouchableOpacity>
        );
      } else if (icon === 'broom' && !cleaning) {
        return(
          <TouchableOpacity onPress={() => this.setState({'cleaning': true})}>
            <Icon
              name={icon}
              size={size}
              color={COLOR.TEXT_DARK}
            />
          </TouchableOpacity>
        );
      } else if (icon === 'broom' && cleaning) {
        return(
            <Icon
              name={icon}
              size={size}
              color='#ccc'
            />
        );
      }
      return(
        <TouchableOpacity onPress={() => Actions.items({'booking': bookingId, 'room': id, 'title': 'Room ' + children, onBack: () => Actions.main()})}>
          <Icon
            name={icon}
            size={size}
            color={COLOR.TEXT_DARK}
          />
        </TouchableOpacity>
      );
    }
    return(
      <Icon
        name={icon}
        size={size}
        color='#ccc'
      />
    );
  }
  render() {
    const { style, children, active, cleaning, id, bookingId } = this.props;
    return (
      <View style={[styles.containerStyle, style]}>
        <View style={styles.leftView}>
          <View style={styles.titleViewStyle}>
            <Text style={styles.roomNumberStyle}>
              {children}
            </Text>
          </View>
          <View style={styles.titleViewStyle}>
            <Text style={styles.roomDetailStyle}>
              { active ? 'Booked': 'Empty'}
            </Text>
          </View>
        </View>
        <View style={styles.halfStyle}>
          <View style={styles.horizontalStyle}>
            <View style={styles.buttonStyle}>
              {this.renderThis(active, 'food-fork-drink', false)}
            </View>
            <View style={styles.buttonStyle}>
              {this.renderThis(true, 'broom', cleaning)}
            </View>
          </View>
          <View style={styles.horizontalStyle}>
            <View style={styles.buttonStyle}>
            {this.renderThis(true, 'nfc', false)}
            </View>
            <View style={styles.buttonStyle}>
              {this.renderThis(true, 'qrcode-scan', false)}
            </View>
          </View>
        </View>

        <Dialog
          key={id + 'nfc'}
          visible={this.state.nfc}
          onTouchOutside={() => {
            this.setState({ nfc: false });
          }}
          dialogAnimation={
            new ScaleAnimation({
              toValue: 0, // optional
              useNativeDriver: true, // optional
            })
          }
        >
          <DialogContent>
            <View style={{ margin: 20, paddingTop: 20, }}>
              <Icon
                name='nfc'
                size={250}
                color={COLOR.NFC_COLOR}
              />
            </View>
          </DialogContent>
        </Dialog>
        <Dialog
          key={id + 'qr'}
          visible={this.state.qr}
          onTouchOutside={() => {
            this.setState({ qr: false });
          }}
          dialogAnimation={
            new ScaleAnimation({
              toValue: 0, // optional
              useNativeDriver: true, // optional
            })
          }
        >
          <DialogContent>
            <View style={{ margin: 20, paddingTop: 20, }}>
                <QRCode
                  value={children}
                  size={250}
                  bgColor={COLOR.QR_COLOR}
                  fgColor='white'/>
            </View>
          </DialogContent>
        </Dialog>
        <Dialog
          key={id + 'cleaning'}
          visible={this.state.cleaning}
          onTouchOutside={() => {
            this.setState({ cleaning: false });
          }}
          actions={[
            <DialogButton
              key={id + 'cancel'}
              text="CANCEL"
              onPress={() => {
                this.setState({ cleaning: false });
              }}
            />,
            <DialogButton
              key={id + 'ok'}
              text="OK"
              onPress={() => {
                this.sendCleaning(id);
                this.setState({ cleaning: false });
              }}
            />,
          ]}
          dialogAnimation={
            new ScaleAnimation({
              toValue: 0, // optional
              useNativeDriver: true, // optional
            })
          }
        >
          <DialogContent>
            <View style={{ margin: 20, paddingTop: 20, }}>
              <Text style={{fontSize: 30}}>Cleaned room {children}?</Text>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#CCC',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  horizontalStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  halfStyle: {
    flex: 0.5,
  },
  buttonStyle: {
    flex: 0.5,
    alignItems: 'center',
    paddingVertical: 5,
  },
  roomNumberStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  roomDetailStyle: {
    fontSize: 20,
    fontWeight: '300',
  },
  titleViewStyle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Rooms };

