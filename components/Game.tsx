"use client";

import { FC, useState } from "react";

interface GameProps {
  words: string[];
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const Game: FC<GameProps> = ({ words }) => {
  const [word, setWord] = useState("");
  const [letterStates, setLetterStates] = useState<boolean[]>([]);

  // Function to handle word selection
  const selectWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setLetterStates(Array(randomWord.length).fill(false));
  };

  // Function to toggle the state of a letter
  const toggleLetterState = (index: number) => {
    const updatedStates = [...letterStates];
    updatedStates[index] = !updatedStates[index];
    setLetterStates(updatedStates);
  };

  // Render the word and letter buttons
  const renderWord = () => {
    return word.split("").map((letter, index) => (
      <div key={index} className="flex flex-col">
        <div className="text-center">{letter}</div>
        <div className="border-[1px] border-black w-[30px]"></div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col">
      <button onClick={selectWord} className="mt-[50px]">
        Select Word
      </button>
      <div className="flex flex-row justify-center">
        <div className="mt-[100px] flex flex-row text-[30px] gap-[30px]">
          {renderWord()}
        </div>
      </div>
      <div className="w-[60%] flex flex-row flex-wrap text-[40px] gap-[30px] justify-center mt-[100px] m-auto">
        {alphabet.map((letter, index) => (
          <button
            key={index}
            className="border-black border-[1px] rounded-[8px] w-[60px] h-[60px] hover:bg-slate-300"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
