import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Gambar from "/anjingkucing.png";
import Gambar2 from "/anjingkucing2.png";

const ScrabbleGame = () => {
  // Shuffle Words
  // const wordList = ["WATERMELON", "APPLE", "ORANGE", "BERRY", "AVOCADO"];
  const wordList = ["ACT", "ACT"];
  const shuffleWord = (word) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  // States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState("");
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [filledWord, setFilledWord] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Scramble words
  useEffect(() => {
    setScrambledWord(shuffleWord(wordList[currentQuestionIndex]));
  }, [currentQuestionIndex]);

  // Timer
  useEffect(() => {
    if (time > 0 && !isCorrect && !isGameOver) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      handleNextScrabble();
    }
  }, [time, isCorrect, isGameOver]);

  // Click word to fill blank space
  const handleCharacterClick = (char, index) => {
    if (selectedIndices.length < wordList[currentQuestionIndex].length) {
      setSelectedIndices([...selectedIndices, index]);
      setFilledWord(filledWord + char);
    }
  };

  useEffect(() => {
    if (filledWord.length === wordList[currentQuestionIndex].length) {
      if (filledWord === wordList[currentQuestionIndex]) {
        const pointsEarned = 1;
        setScore(score + pointsEarned);
        setIsCorrect(true);
        setTimeout(() => handleNextScrabble(), 3000); // Delay to show "awesome!" before moving to the next word
      } else {
        triggerShakeEffect();
      }
    }
  }, [filledWord]);

  const handleNextScrabble = () => {
    if (currentQuestionIndex < wordList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedIndices([]);
      setFilledWord("");
      setTime(60);
      setIsCorrect(false);
    } else {
      setIsGameOver(true);
      endGame();
    }
  };

  const endGame = () => {
    alert("you've finished the game!");
    const userName = localStorage.getItem("userName");

    fetch("http://localhost:4000/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName, score: score + 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error saving score:", error);
      });

    setTimeout(() => {
      localStorage.clear();
      navigate("/");
    }, 3000);
  };

  // Shake Effect
  const triggerShakeEffect = () => {
    setIsShake(true);
    setTimeout(() => {
      setIsShake(false);
      setSelectedIndices([]);
      setFilledWord("");
    }, 500);
  };

  // Text gradient
  const styleGradient =
    "bg-gradient-to-r from-[#E1BD82] to-[#A1783F] bg-clip-text text-transparent";

  return (
    <MainLayout>
      <div className="w-4/5 mx-auto text-center">
        {isCorrect ? (
          <div className="h-full mt-[15rem]">
            <h1
              className={`text-[8em] font-aptos-semibold uppercase leading-none ${styleGradient}`}
            >
              awesome!
            </h1>
          </div>
        ) : isGameOver ? (
          <div>
            <h1
              className={`text-[8em] font-aptos-semibold uppercase leading-none mt-[5rem] ${styleGradient}`}
            >
              times up!
            </h1>
            <p
              className={`text-[5em] font-aptos-semibold uppercase leading-none mt-[5rem] ${styleGradient}`}
            >
              you have <br /> completed the game
            </p>
          </div>
        ) : (
          <div>
            {/* Countdown */}
            <h1 className={`text-[10rem] mt-[1vh] font-uptos ${styleGradient}`}>
              {time}
            </h1>
            {/* Blank space */}
            <div
              className={`flex flex-wrap items-center gap-4 mt-[4vh] ${
                isShake ? "shake" : ""
              }`}
            >
              {wordList[currentQuestionIndex].split("").map((_, index) => (
                <div
                  key={index}
                  className="mx-auto border-b-[.5vh] border-main w-[10vw] h-10 flex items-center justify-center p-10"
                >
                  <h2 className="text-[3em] font-aptos-semibold text-main">
                    {filledWord[index] || ""}
                  </h2>
                </div>
              ))}
            </div>
            {/* Words */}
            <div className="relative z-10">
              <h2
                className={`text-[7rem] mt-[1vh] font-aptos-semibold ${styleGradient}`}
              >
                {scrambledWord.split("").map((char, index) => (
                  <button
                    key={index}
                    onClick={() => handleCharacterClick(char, index)}
                    disabled={selectedIndices.includes(index)}
                    className={`rounded ${
                      selectedIndices.includes(index)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-10 right-0 left-0">
        <img
          src={isCorrect ? Gambar2 : Gambar}
          alt="hewan.png"
          className="bg-cover w-[100%] mx-auto -mt-32 -z-10"
        />
      </div>
    </MainLayout>
  );
};

export default ScrabbleGame;
