import './Form.css';
import { useState } from 'react';
import { words, previousAnswers } from '../../data/possible-words';

export const Form = () => {
  const [blackLetters, setBlackLetters] = useState('');
  const [G1, setG1] = useState('');
  const [G2, setG2] = useState('');
  const [G3, setG3] = useState('');
  const [G4, setG4] = useState('');
  const [G5, setG5] = useState('');
  const [Y1, setY1] = useState('');
  const [Y2, setY2] = useState('');
  const [Y3, setY3] = useState('');
  const [Y4, setY4] = useState('');
  const [Y5, setY5] = useState('');

  function filterBlack(lettersArray, wordsArray) {
    const uppercaseLettersArray = lettersArray.map((letter) =>
      letter.toUpperCase()
    );

    const blackFilteredWords = wordsArray.filter((word) => {
      const uppercaseWord = word.toUpperCase();
      for (let i = 0; i < uppercaseWord.length; i++) {
        if (uppercaseLettersArray.includes(uppercaseWord[i])) {
          return false;
        }
      }
      return true;
    });

    return blackFilteredWords;
  }

  function filterYellow(y, yy, yyy, yyyy, yyyyy, wordsArray) {
    let yellowWords = wordsArray;
    const yArray = [...y, ...yy, ...yyy, ...yyyy, ...yyyyy];
    const yObject = {
      0: [...y],
      1: [...yy],
      2: [...yyy],
      3: [...yyyy],
      4: [...yyyyy],
    };
    if (yArray.length) {
      yellowWords = yellowWords.filter((word) =>
        yArray.every((letter) => word.includes(letter))
      );
      if (yObject[0].length) {
        yellowWords = yellowWords.filter(
          (word) => !yObject[0].includes(word.charAt(0))
        );
      }
      if (yObject[1].length) {
        yellowWords = yellowWords.filter(
          (word) => !yObject[1].includes(word.charAt(1))
        );
      }
      if (yObject[2].length) {
        yellowWords = yellowWords.filter(
          (word) => !yObject[2].includes(word.charAt(2))
        );
      }
      if (yObject[3].length) {
        yellowWords = yellowWords.filter(
          (word) => !yObject[3].includes(word.charAt(3))
        );
      }
      if (yObject[4].length) {
        yellowWords = yellowWords.filter(
          (word) => !yObject[4].includes(word.charAt(4))
        );
      }
      return yellowWords;
    } else {
      return wordsArray;
    }
  }

  function filterGreen(G1, G2, G3, G4, G5, wordsArray) {
    let filteredGreen = wordsArray;
    if (G1.length) {
      filteredGreen = filteredGreen.filter(word => word.charAt(0) === G1)
    }
    if (G2.length) {
      filteredGreen = filteredGreen.filter(word => word.charAt(1) === G2)
    }
    if (G3.length) {
      filteredGreen = filteredGreen.filter(word => word.charAt(2) === G3)
    }
    if (G4.length) {
      filteredGreen = filteredGreen.filter(word => word.charAt(3) === G4)
    }
    if (G5.length) {
      filteredGreen = filteredGreen.filter(word => word.charAt(4) === G5)
    }
    return filteredGreen;
  }

  const unusedAnswers = words
    .map((word) => word.toUpperCase())
    .filter((word) => {
      return !previousAnswers.includes(word);
    });

  const filteredGreenWords = filterGreen(G1, G2, G3, G4, G5, unusedAnswers);
  const yellowFilteredWords = filterYellow(
    Y1,
    Y2,
    Y3,
    Y4,
    Y5,
    filteredGreenWords
  );
  
  const filteredWords = filterBlack(
    blackLetters.split(''),
    yellowFilteredWords
  ).map((word) => {
    return (
      <div className="word-card" key={word}>
        <p>{word.toUpperCase()}</p>
      </div>
    );
  });

  return (
    <div>
      <form className="wordle-form">
        <div className="green-letter-inputs">
          <label htmlFor="G1">Green Letters:</label>
          <div className="glinputs">
            <input
              maxLength={1}
              name="G1"
              className="green letter"
              value={G1}
              type="text"
              onChange={(e) => {
                setG1(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              maxLength={1}
              name="G2"
              className="green letter"
              value={G2}
              type="text"
              onChange={(e) => {
                setG2(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              maxLength={1}
              name="G3"
              className="green letter"
              value={G3}
              type="text"
              onChange={(e) => {
                setG3(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              maxLength={1}
              name="G4"
              className="green letter"
              value={G4}
              type="text"
              onChange={(e) => {
                setG4(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              maxLength={1}
              name="G5"
              className="green letter"
              value={G5}
              type="text"
              onChange={(e) => {
                setG5(e.target.value.toUpperCase());
              }}
            ></input>
          </div>
        </div>
        <div className="yellow-letter-inputs">
          <label htmlFor="Y1">Yellow Letters:</label>
          <div className="ylinputs">
            <input
              name="Y1"
              className="yellow letter"
              value={Y1}
              type="text"
              onChange={(e) => {
                setY1(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y2"
              className="yellow letter"
              value={Y2}
              type="text"
              onChange={(e) => {
                setY2(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y3"
              className="yellow letter"
              value={Y3}
              type="text"
              onChange={(e) => {
                setY3(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y4"
              className="yellow letter"
              value={Y4}
              type="text"
              onChange={(e) => {
                setY4(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y5"
              className="yellow letter"
              value={Y5}
              type="text"
              onChange={(e) => {
                setY5(e.target.value.toUpperCase());
              }}
            ></input>
          </div>
        </div>
        <label htmlFor="black">Black Letters:</label>
        <input
          className="black letter"
          value={blackLetters}
          type="text"
          name="black"
          onChange={(e) => {
            setBlackLetters(e.target.value.toUpperCase());
          }}
        ></input>
      </form>
      <main className="word-cards">{filteredWords}</main>
    </div>
  );
};
