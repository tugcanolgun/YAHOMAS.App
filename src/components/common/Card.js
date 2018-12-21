import React  from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#CCC',
    // borderBottomWidth: 0,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 1.41,
    // shadowOpacity: 0.1,
    // elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    // color: COLOR.WHITE,
  },
});

export { Card };
