import React  from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as COLOR from './Colors';

const Button = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]}>
      <Text style={styles.textStyle}>{children}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: COLOR.WHITE,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    backgroundColor: COLOR.BACKGROUND_DARK,
    borderRadius: 25,
    lineHeight: 23,
    borderWidth: 1,
    borderColor: COLOR.BORDER_BRIGHT,
  },
});

export { Button };