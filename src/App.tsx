import { useCallback, useEffect, useState } from "react";
import words from "./helpers/wordList.json";
import { HangmanDrawing, HangmanWords, Keyborad } from "./components/index";

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const inCorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  const isLoser = inCorrectLetters.length >= 6;
  const winner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || winner) return;

      setGuessedLetters((currentLetter) => [...currentLetter, letter]);
    },
    [guessedLetters, isLoser, winner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;

      setWordToGuess(getWord());
      setGuessedLetters([]);
      e.preventDefault();
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
        {winner && <p>Winner! Refresh to try again!</p>}

        {isLoser && <p>You lose! Try again</p>}
      </h2>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWords
        reveal={isLoser}
        guessedLetter={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyborad
          disabled={winner || isLoser}
          addGuessLetter={addGuessLetter}
          activeLetter={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetter={inCorrectLetters}
        />
      </div>
    </div>
  );
}

export default App;
