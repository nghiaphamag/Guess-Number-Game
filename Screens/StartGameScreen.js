import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';

import Input from '../components/Input';
import Card from '../components/Card';
import Color from '../constants/Color';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWith, setButtonWith] = useState(Dimensions.get('window').width /4);

  //Validate && Add number into state from InputForm
  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };
  //Clear State
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = ()=>{
      setButtonWith(Dimensions.get('window').width /4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return ()=>{
      Dimensions.removeEventListener('change', updateLayout);
    }
  });
  //Confirm number
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Number has to be a number between 1 to 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      Keyboard.dismiss();
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed)
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You Selected </BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
      </Card>
    );
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game :)</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText> Select The Number </BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                value={enteredValue}
                onChangeText={numberInputHandler}
              />
              <View style={styles.buttonContainer}>
                <View style={{width:buttonWith}}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Color.accent}
                  />
                </View>
                <View style ={{width:buttonWith}}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Color.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  // button: {
  //   width: 100,
  //   width: Dimensions.get('window').width / 4
  // },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
