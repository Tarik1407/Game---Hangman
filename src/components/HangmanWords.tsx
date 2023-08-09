import React from "react";

type HangmanWordsProps = {
  guessedLetter: string[];
  wordToGuess: string;
  reveal?: boolean;
};

const HangmanWords = ({
  guessedLetter,
  wordToGuess,
  reveal = false,
}: HangmanWordsProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25rem",
        fontSize: "5rem",
        fontWeight: "bold",
        textTransform: "capitalize",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".5rem solid black" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetter.includes(letter) || reveal ? "visible" : "hidden",
              color:
                !guessedLetter.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWords;
