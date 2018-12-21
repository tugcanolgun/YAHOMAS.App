import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as COLOR from './Colors';

class Input extends Component {
  renderKeyboard() {
    const { value, onChangeText, placeholder, secureTextEntry } = this.props;
    if (this.props.numeric) {
      return (
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholderTextColor={COLOR.TEXT_BRIGHT}
          keyboardType='numeric'
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          style={styles.inputTextInputStyle}
        />
      );
    }
    return (
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholderTextColor={COLOR.TEXT_BRIGHT}
          keyboardType='default'
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          style={styles.inputTextInputStyle}
        />
    );
  }
  renderLabel() {
    if (this.props.label) {
      return <Text style={styles.labelStyle}>{this.props.label}</Text>;
    }
  }
  render() {
    // const { label } = this.props;
    return(
      <View style={styles.inputViewStyle}>
        {this.renderLabel()}
        {this.renderKeyboard()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputViewStyle: {
    flex: 1,
    width: null,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 10,
    color: COLOR.TEXT_BRIGHT,
    flex: 1,
  },
  inputTextInputStyle: {
    flex: 2,
    width: null,
    borderColor: COLOR.TEXT_DARK,
    borderWidth: 1,
    // marginRight: 10,
    borderRadius: 25,
    color: COLOR.TEXT_BRIGHT,
    paddingRight: 5,
    paddingLeft: 30,
    fontSize: 18,
    lineHeight: 23,
  }

});

export { Input };
