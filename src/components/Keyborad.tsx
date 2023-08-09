import React from "react";
import "../components/styles/keybord.css";
const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyboardProps = {
  addGuessLetter: (letter: string) => void;
  activeLetter: string[];
  inactiveLetter: string[];
  disabled: boolean;
};

const Keyborad = ({
  addGuessLetter,
  disabled = false,
  activeLetter,
  inactiveLetter,
}: KeyboardProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px,1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map((letter, index) => {
        const active = activeLetter.includes(letter);
        const inactive = inactiveLetter.includes(letter);
        return (
          <button
            disabled={active || inactive || disabled}
            onClick={() => addGuessLetter(letter)}
            className={`btn ${active ? "active" : ""} ${
              inactive ? "inactive" : ""
            }`}
            key={index}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyborad;
