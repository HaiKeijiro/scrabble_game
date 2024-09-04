import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Hewan from "/anjingkucing.png";

const ScrabbleGame = () => {
  const wordList = ["APPLE", "ORANGE", "WATERMELON", "BERRY", "AVOCADO"];

  const shuffleWord = (word) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState("");
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [filledWord, setFilledWord] = useState("");
  const [score, setScore] = useState(0);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [time, setTime] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    setScrambledWord(shuffleWord(wordList[currentQuestionIndex]));
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (time > 0 && !showNotification) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      handleTimesUp();
    }
  }, [time, showNotification]);

  const handleCharacterClick = (char, index) => {
    if (selectedIndices.length < wordList[currentQuestionIndex].length) {
      setSelectedIndices([...selectedIndices, index]);
      setFilledWord(filledWord + char);
    }
  };

  useEffect(() => {
    if (filledWord.length === wordList[currentQuestionIndex].length) {
      if (filledWord === wordList[currentQuestionIndex]) {
        const pointsEarned = calculatePoints(filledWord);
        setScore(score + pointsEarned);
        setNotification(`Awesome! +${pointsEarned} points`);
        setShowNotification(true);
        setTimeout(() => handleNextQuestion(), 3000);
      } else {
        triggerShakeEffect();
        setNotification("Not the correct word. Try again!");
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          setSelectedIndices([]);
          setFilledWord("");
        }, 2000);
      }
    }
  }, [filledWord]);

  const handleTimesUp = () => {
    setShowNotification(true);
    setTimeout(() => handleNextQuestion(), 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < wordList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedIndices([]);
      setFilledWord("");
      setTime(60);
      setNotification("");
      setShowNotification(false);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    // Save score logic here if needed
    setNotification("Game Over!");
    setShowNotification(true);
    setTimeout(() => {
      navigate("/"); // Redirect to home page or scoreboard
    }, 3000);
  };

  const triggerShakeEffect = () => {
    setState((prevState) => ({ ...prevState, shake: true }));
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        shake: false,
        selectedIndices: [],
        filledWord: "",
      }));
    }, 500);
  };

  const calculatePoints = (word) => {
    const length = word.length;
    if (length <= 4) return 1;
    if (length <= 6) return 2;
    if (length <= 8) return 3;
    return 4;
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center text-main relative z-10">
        {!showNotification && (
          <>
            <div className="text-[10rem] mt-[1vh] font-uptos text-main">
              {time}
            </div>

            <div className="flex flex-wrap w-[90%] mt-[3vh] gap-x-4 gap-y-10">
              {wordList[currentQuestionIndex].split("").map((_, index) => (
                <div
                  key={index}
                  className="text-4xl mx-auto border-b-[.5vh] border-main w-[10vw] h-10 flex items-center justify-center"
                >
                  {filledWord[index] || ""}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-[2vh]">
              {scrambledWord.split("").map((char, index) => (
                <button
                  key={index}
                  onClick={() => handleCharacterClick(char, index)}
                  disabled={selectedIndices.includes(index)}
                  className={`bg-gold text-main text-[5rem] rounded ${
                    selectedIndices.includes(index)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-4 uppercase text-center">
          <h1 className="text-[8rem]">{notification}</h1>
        </div>
      </div>
      <img
        src={Hewan}
        alt="hewan.png"
        className="bg-cover w-[100%] mx-auto -mt-32 -z-10"
      />
    </MainLayout>
  );
};

export default ScrabbleGame;
