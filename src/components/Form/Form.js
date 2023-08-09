import './Form.css';
import { useState } from 'react';
import { words, previousAnswers, commonWords } from '../../data/possible-words';

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
  const [guessedButtonText, setGuessedButtonText] = useState(
    'Hide Previous NYT Answers'
  );
  const [NYThidden, setNYThidden] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);

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
      filteredGreen = filteredGreen.filter((word) => word.charAt(0) === G1);
    }
    if (G2.length) {
      filteredGreen = filteredGreen.filter((word) => word.charAt(1) === G2);
    }
    if (G3.length) {
      filteredGreen = filteredGreen.filter((word) => word.charAt(2) === G3);
    }
    if (G4.length) {
      filteredGreen = filteredGreen.filter((word) => word.charAt(3) === G4);
    }
    if (G5.length) {
      filteredGreen = filteredGreen.filter((word) => word.charAt(4) === G5);
    }
    return filteredGreen;
  }

  function countLettersInWords(wordsArray) {
    return wordsArray.reduce((letterCount, word) => {
      word.split('').forEach((char) => {
        if (letterCount[char]) {
          letterCount[char]++;
        } else {
          letterCount[char] = 1;
        }
      });

      return letterCount;
    }, {});
  }

  function handleGuessedClick(e) {
    e.preventDefault();
    if (!NYThidden) {
      setGuessedButtonText('Show Previous NYT Answers');
      setNYThidden(true);
    } else {
      setGuessedButtonText('Hide Previous NYT Answers');
      setNYThidden(false);
    }
  }

  function handleLetterClick(e, letter) {
    e.preventDefault();
    if (selectedLetters.includes(letter)) {
      const index = selectedLetters.indexOf(letter);
      let arrayCopy = selectedLetters.slice();
      arrayCopy.splice(index, 1);
      setSelectedLetters(arrayCopy);
    } else if (selectedLetters.length < 5) {
      setSelectedLetters([...selectedLetters, letter]);
    }
  }

  function includesAllLetters(word, lettersArray) {
    for (const letter of lettersArray) {
      if (!word.includes(letter)) {
        return false;
      }
    }
    return true;
  }

  function filterSelectedLetters(words, letters) {
    if (letters.length) {
      return words.filter((word) => includesAllLetters(word, letters));
    } else {
      return words;
    }
  }

  const capCommonWords = commonWords.map(word => word.toUpperCase())

  function filterPrev() {
    if (NYThidden) {
      return words
        .map((word) => word.toUpperCase())
        .filter((word) => {
          return !previousAnswers.includes(word);
        });
    } else {
      return words.map((word) => word.toUpperCase());
    }
  }

  const unusedAnswers = filterPrev();
  const filteredLetterAnswers = filterSelectedLetters(
    unusedAnswers,
    selectedLetters
  );

  const filteredGreenWords = filterGreen(
    G1,
    G2,
    G3,
    G4,
    G5,
    filteredLetterAnswers
  );
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
  );

  const renderedWords = filteredWords.map((word) => {
    return (
      <div className={capCommonWords.includes(word) ? "common word-card" : "word-card"} key={word}>
        <p>{word.toUpperCase()}</p>
      </div>
    );
  });

  const lettersLeft = countLettersInWords(filteredWords);
  const renderedLettersLeft = Object.entries(lettersLeft)
    .sort((a, b) => b[1] - a[1])
    .map((letter) => {
      return (
        <div
          className={
            selectedLetters.includes(letter[0].toString())
              ? 'selected letter-count'
              : 'letter-count'
          }
          key={letter[0]}
          onClick={(e) => {
            handleLetterClick(e, letter[0]);
          }}
        >
          <p>
            {letter[0]}: {letter[1]}
          </p>
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
              pattern="[A-Za-z]"
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
              pattern="[A-Za-z]"
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
              pattern="[A-Za-z]"
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
              pattern="[A-Za-z]"
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
              pattern="[A-Za-z]"
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
              pattern="[A-Za-z]"
              className="yellow letter"
              value={Y1}
              type="text"
              onChange={(e) => {
                setY1(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y2"
              pattern="[A-Za-z]"
              className="yellow letter"
              value={Y2}
              type="text"
              onChange={(e) => {
                setY2(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y3"
              pattern="[A-Za-z]"
              className="yellow letter"
              value={Y3}
              type="text"
              onChange={(e) => {
                setY3(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y4"
              pattern="[A-Za-z]"
              className="yellow letter"
              value={Y4}
              type="text"
              onChange={(e) => {
                setY4(e.target.value.toUpperCase());
              }}
            ></input>
            <input
              name="Y5"
              pattern="[A-Za-z]"
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
          pattern="[A-Za-z]"
          value={blackLetters}
          type="text"
          name="black"
          onChange={(e) => {
            setBlackLetters(e.target.value.toUpperCase());
          }}
        ></input>
      </form>
      <button
        id="guessed"
        onClick={(e) => {
          handleGuessedClick(e);
        }}
      >
        {guessedButtonText}
      </button>
      <main className="word-cards">
        <h3>Amount of each letter left in remaining words:</h3>
        <p>(You can also click up to 5 letters to filter down the word list further.)</p>
        <section className="letters-left">{renderedLettersLeft}</section>
        <h3>Remaining Available Words: {renderedWords.length}</h3>
        <p>(Words highlighted green are among the most common 5-letter words.)</p>
        <section className="words-left">{renderedWords}</section>
      </main>
    </div>
  );
};
