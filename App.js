/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback, useState} from 'react';

import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// screens
import GameScreen from './src/screens/GameSreen';
import MainScreen from './src/screens/MainScreen';

// constants
import {MAIN_URL, SCREENS} from './src/common/constants';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [highScore, setHighScore] = useState('0');
  const [currentScreen, setCurrentScreen] = useState(SCREENS.MAIN);
  const [deckID, setDeckID] = useState(null);

  useEffect(() => {
    if (!deckID) {
      getNewDesk();
    }
  }, []);

  const getNewDesk = useCallback(async () => {
    try {
      const response = await fetch(`${MAIN_URL}new/`, {});

      const data = await response.json();
      setDeckID(data.deck_id);
      await fetch(`${MAIN_URL}${data.deck_id}/shuffle/`);
    } catch (error) {
      console.log('FETCH ERROR:', error);
    }
  }, []);

  const startGame = () => {
    setCurrentScreen(SCREENS.GAME);
  };

  const endGame = () => {
    setCurrentScreen(SCREENS.MAIN);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {currentScreen === SCREENS.GAME ? (
        <GameScreen
          highScore={highScore}
          setHighScore={setHighScore}
          deckID={deckID}
          endGame={endGame}
        />
      ) : (
        <MainScreen highScore={highScore} startGame={startGame} />
      )}
    </SafeAreaView>
  );
};

export default App;
