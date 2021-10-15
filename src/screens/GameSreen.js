import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';

// constants
import {cards, MAIN_URL, PREDICTION} from '../common/constants';

const GameScreen = ({deckID, highScore, setHighScore, endGame}) => {
  const [lastCard, setLastCard] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [roundScore, setRoundScore] = useState(0);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    getNextCard();
  }, []);

  const getNextCard = async () => {
    try {
      const response = await fetch(`${MAIN_URL}${deckID}/draw/?count=1`, {});

      const data = await response.json();
      setCurrentCard(data.cards[0]);
    } catch (error) {
      console.log('FETCH ERROR:', error);
    }
  };

  const countPrediction = () => {
    if (prediction) {
      console.log(
        `Last card ${cards[lastCard.value]} ${prediction} then ${
          cards[currentCard.value]
        }`,
      );

      if (
        prediction === PREDICTION.LOWER &&
        cards[lastCard.value] > cards[currentCard.value]
      ) {
        setRoundScore(roundScore + 1);
      } else if (
        prediction === PREDICTION.HIGHER &&
        cards[lastCard.value] < cards[currentCard.value]
      ) {
        setRoundScore(roundScore + 1);
      }
    }
  };

  const handleHigherCard = async () => {
    setLastCard(currentCard);
    setPrediction(PREDICTION.HIGHER);
    await getNextCard();
    countPrediction();
  };

  const handleLowerCard = async () => {
    setLastCard(currentCard);
    setPrediction(PREDICTION.LOWER);
    await getNextCard();
    countPrediction();
  };

  const handleEndGame = () => {
    if (highScore < roundScore) {
      setHighScore(roundScore);
    }
    endGame();
  };

  return (
    <View style={styles.gameView}>
      <Image
        style={styles.cardImage}
        source={{
          uri: currentCard?.image,
        }}
      />
      <View style={styles.buttonsBlock}>
        <Button title="Lower" onPress={() => handleLowerCard()} />
        <Button title="Higher" onPress={() => handleHigherCard()} />
      </View>
      <Text>Current score is: {roundScore}</Text>
      <Button title="End game" onPress={() => handleEndGame()} />
    </View>
  );
};

const styles = StyleSheet.create({
  gameView: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  cardImage: {
    width: 226,
    height: 314,
  },
  buttonsBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default GameScreen;
