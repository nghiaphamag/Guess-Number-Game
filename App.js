import React , { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import Header from './components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';

const fetchFont = ()=>{
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App(){

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  //Check Font
  if(!dataLoaded)
    return(<AppLoading startAsync={fetchFont} onFinish={()=>setDataLoaded(true)} />);

  const configureNewGame =()=>{
    setGuessRounds(0);
    setUserNumber(null);
  }
 
  const startGameHandler = (selectedNumber)=>{
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds=>{
    setGuessRounds(numOfRounds);
  };
  //Handler and Redirect Screen
  let content = <StartGameScreen onStartGame={startGameHandler} />
  if(userNumber && guessRounds <=0)
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  else if(guessRounds > 0){
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGame}
      />
    );
  }
    return (
      <View style={styles.screen}>
        <Header title="Guess a Number" />
        {content}
      </View>
    );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
