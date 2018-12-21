import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import axios from 'axios';
import Dialog, { DialogContent, ScaleAnimation, DialogButton } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as COLOR from './Colors';
import * as CON from '../Cons';

class ItemCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'deleteModal': false,
      'addModal': false,
    };
  }
  deleteItem() {
    const { booking, purchased_id, title } = this.props;
    const { name, id, image, price } = this.props.item;
    var user = '';
    AsyncStorage.getItem('user')
      .then(item => {
        user=item;
      })
      .then(() => {
        return axios.delete(CON.URL + CON.ITEMS + '/delete/' + purchased_id)
      })
      .then(response => {
        console.log(response.data);
        Actions.items({'booking': booking, 'room': id, 'title': title, onBack: () => Actions.main()})
      })
      .catch(error => {
        console.log(error);
      })
  }
  addItem() {
    const { id } = this.props.item;
    const { booking, title } = this.props;
    var user = '';
    AsyncStorage.getItem('user')
      .then(item => {
        user=item;
      })
      .then(() => {
        return axios.post(CON.URL + CON.ITEMS + '/' + booking,
            {
              "booking": booking,
              "user": user,
              "item": id
            })
      })
      .then(response => {
        console.log(response.data);
        Actions.items({'booking': booking, 'room': id, 'title': title, onBack: () => Actions.main()})
      })
      .catch(error => {
        console.log(error);
      })
  }
  renderDeleteButton() {
    const { number, purchased_id } = this.props;
    let size = 30;
    if (number > 0) {
      return (
        <TouchableOpacity  onPress={() => this.setState({'deleteModal': true})}>
          <Icon
            name='minus'
            size={size}
            color={COLOR.TEXT_DARK}
          />
        </TouchableOpacity>
      );
    }
    return (
        <Icon
          name='minus'
          size={size}
          color='#ccc'
        />
    );
  }
  render() {
    const { name, id, image, price } = this.props.item;
    const { children, number, purchased_id } = this.props;
    return(
      <View style={styles.cardStyle}>
        <View style={styles.imageViewStyle}>
          <Image
            source={{uri: CON.PURE_URL + image}}
            style={styles.imageStyle}
            />
        </View>
        <View style={styles.titleViewStyle}>
          <View><Text style={styles.nameStyle}>{children}</Text></View>
          <View style={styles.priceView}><Text>{price}$</Text><Text style={styles.orderedStyle}>{number > 0 ? 'Ordered ' + number: null} </Text></View>
        </View>
        <View style={styles.buttonViewStyle}>
          <View>
            <TouchableOpacity  onPress={() => this.setState({'addModal': true})}>
              <Icon
                name='plus'
                size={30}
                color={COLOR.TEXT_DARK}
              />
            </TouchableOpacity>
          </View>
          <View>
            {this.renderDeleteButton()}
          </View>
        </View>

        <Dialog
          key={id + 'delete'}
          visible={this.state.deleteModal}
          onTouchOutside={() => {
            this.setState({ deleteModal: false });
          }}
          actions={[
            <DialogButton
              key={id + 'cancel'}
              text="CANCEL"
              onPress={() => {
                this.setState({ deleteModal: false });
              }}
            />,
            <DialogButton
              key={id + 'delete'}
              text="DELETE"
              onPress={() => {
                this.deleteItem();
                this.setState({ deleteModal: false });
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
              <Text style={{fontSize: 30}}>Delete {children}?</Text>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          key={id + 'add'}
          visible={this.state.addModal}
          onTouchOutside={() => {
            this.setState({ addModal: false });
          }}
          actions={[
            <DialogButton
              key={id + 'cancel'}
              text="CANCEL"
              onPress={() => {
                this.setState({ addModal: false });
              }}
            />,
            <DialogButton
              key={id + 'add'}
              text="ADD"
              onPress={() => {
                this.addItem();
                this.setState({ addModal: false });
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
              <Text style={{fontSize: 30}}>Add {children}?</Text>
            </View>
          </DialogContent>
        </Dialog>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#CCC',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  orderedStyle: {
    color: COLOR.TEXT_DARK,
    fontWeight: 'bold',
  },
  priceView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleViewStyle: {
    flex: 0.4,
    justifyContent: 'center',
  },
  imageViewStyle: {
    flex: 0.3,
    justifyContent: 'center',
  },
  buttonViewStyle: {
    flex: 0.2,
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  imageStyle: {
    height: 70,
    width: null,
  },
  nameStyle: {
    fontSize: 24,
    // fontWeight: '800',
  },
});

export { ItemCards };