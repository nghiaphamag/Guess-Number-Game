import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props =>{
  return(
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card:{
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowRadius:6,
    shadowOffset:{width:0, height:2},
    backgroundColor:'white',
    padding:20,
    borderRadius:20
  }
});
export default Card;