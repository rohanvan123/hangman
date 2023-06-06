"use client";

import { FC, useEffect, useState } from "react";

interface GameProps {
  words: string[];
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const Game: FC<GameProps> = ({ words }) => {
  const [disableAll, setDisableAll] = useState(true);
  const [word, setWord] = useState("");
  const [letterStates, setLetterStates] = useState<boolean[]>([]);
  const [alphabetStates, setAlphabetStates] = useState<boolean[]>([]);
  const [tryCount, setTryCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [win, setWin] = useState(false);

  // Function to handle word selection
  const selectWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setLetterStates(Array(randomWord.length).fill(false));
    setAlphabetStates(Array(alphabet.length).fill(false));
    setTryCount(0);
  };

  
  // Function to toggle the state of a letter
  const toggleLetterState = (index: number) => {
    const selectedLetter = word[index];

    if (selectedLetter) {
      const updatedStates = letterStates.map((state, i) =>
        word[i] === selectedLetter ? !state : state
      );
      setLetterStates(updatedStates);
    }
  };

  // Function to toggle the state of an alphabet letter
  const toggleAlphabetState = (index: number) => {
    const updatedStates = [...alphabetStates];
    updatedStates[index] = true;
    setAlphabetStates(updatedStates);
  };

  // Game functions

  const handleLetterPress = (index: number) => {
    toggleAlphabetState(index);
    const chosenLetter = alphabet[index];
    var correctIndices = [];

    for (let i = 0; i < word.length; i++) {
      if (word[i] == chosenLetter) {
        correctIndices.push(i);
      }
    }

    if (correctIndices.length > 0) {
      toggleLetterState(correctIndices[0]);
    } else {
      setTryCount(tryCount + 1);
    }
  };

  const resetGame = () => {
    setDisableAll(false);
    setShowPopup(false);
    setWin(false);
    selectWord();
  };

  useEffect(() => {
    if (!disableAll) {
      if (tryCount >= 6) {
        setShowPopup(true);
      } else {
        var completed = true;
        for (let i = 0; i < letterStates.length; i++) {
          if (letterStates[i] == false) {
            completed = false;
          }
        }

        if (completed) {
          setWin(true);
          setShowPopup(true);
        }
      }
    }
  }, [tryCount, letterStates, disableAll]);

  console.log(win);
  console.log(tryCount);
  // Render the word and letter buttons
  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <div key={index} className="flex flex-col">
        <div className={`text-center ${letterStates[index] ? "" : "hidden"}`}>
          {letter}
        </div>
        <div
          className={`border-[1px] border-black w-[30px] ${
            letterStates[index] ? "" : "mt-[45px]"
          }`}
        ></div>
      </div>
    ));
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center ${
        showPopup ? "bg-[rgba(0,0,0,.5)]" : ""
      }`}
    >
      <div className="text-center text-[75px]">Hangman</div>
      {showPopup && (
        <div className="w-[300px] h-[175px] border-black border-[1px] rounded-[8px] absolute z-50 bg-white flex flex-col text-center gap-[30px] items-center">
          {win ? (
            <div className="mt-[30px] text-[20px]">You Win!</div>
          ) : (
            <div>
              <div className="mt-[30px] text-[20px]">You Lose!</div>
              <div>The correct word was: {word}</div>
            </div>
          )}
          <button
            onClick={resetGame}
            className="border-black border-[1px] w-[50%] h-[50px] rounded-[8px] hover:bg-blue-500 hover:text-white"
          >
            Play Again
          </button>
        </div>
      )}
      <div className="flex flex-col">
        {disableAll ? (
          <button onClick={resetGame} className="mt-[50px]">
            Start Game
          </button>
        ) : (
          <button onClick={selectWord} className="mt-[50px]">
            Select Word
          </button>
        )}
        <div className="flex flex-row justify-center">
          <div className="mt-[100px] flex flex-row text-[30px] gap-[30px]">
            {renderWord()}
          </div>
        </div>
        <div className="text-center mt-[50px]">
          Guesses Remaining: {6 - tryCount}
        </div>
        <div className="w-[60%] flex flex-row flex-wrap text-[40px] gap-[30px] justify-center mt-[50px] m-auto">
          {alphabet.map((letter, index) => (
            <button
              key={index}
              className={`border-black border-[1px] rounded-[8px] w-[60px] h-[60px] ${
                alphabetStates[index] ? "bg-slate-500" : "hover:bg-slate-300 "
              }`}
              disabled={alphabetStates[index]}
              onClick={() => handleLetterPress(index)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
