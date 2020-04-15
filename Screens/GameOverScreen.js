import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/Color';
import MainButton from '../components/MainButton';

const GameOverScreen = props=>{
  return(
    <ScrollView>
      <View style={styles.screen}>
        <TitleText> Game Over!!!</TitleText>
        <Image 
          source={require('../assets/success.png')} 
          style={styles.image}
          resizeMethod="cover"
        />
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>.
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:10
  },
  image:{
    height:Dimensions.get('window').width * 0.7,
    width: Dimensions.get('window').width * 0.7,
    borderRadius:Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 2,
    borderColor: 'grey',
    overflow:'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height <400 ? 16 : 20
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  }
});

export default GameOverScreen;