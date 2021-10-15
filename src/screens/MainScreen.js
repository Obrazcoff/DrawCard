import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const MainScreen = ({highScore, startGame}) => {
  return (
    <View style={styles.mainView}>
      <Button title="Start Game" onPress={startGame} />
      <Text style={styles.highScore}>Highest score is: {highScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    top: 100,
  },
  highScore: {
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default MainScreen;
