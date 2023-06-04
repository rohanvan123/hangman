import Image from "next/image";
import words from "../data/words.json";
import Game from "@/components/Game";

export default function Home() {
  return (
    <div>
      <div className="text-center text-[75px] mt-[50px]">Hangman</div>
      <Game words={words["words"]}></Game>
    </div>
  );
}
