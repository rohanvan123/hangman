import Image from "next/image";
import words from "../data/words.json";
import Game from "@/components/Game";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Game words={words["words"]}></Game>
    </div>
  );
}
