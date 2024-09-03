import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Hewan from "/anjingkucing.png";

const questions = [
  { id: 1, word: "APPLE", scrambled: "LONRPAPE" },
  { id: 2, word: "ORANGE", scrambled: "AGNROEGB" },
  // { id: 3, word: "BANANA", scrambled: "NABANABU" },
  // Add more questions here...
];

const ScrabbleGame = () => {
  const initialState = () => {
    const savedState = JSON.parse(localStorage.getItem("gameState"));
    return (
      savedState || {
        currentQuestion: 0,
        selectedIndices: [],
        filledWord: "",
        time: 120,
        score: 0,
        notification: "",
        showNotification: false,
        shake: false,
      }
    );
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.time > 0 && !state.showNotification) {
      const timer = setTimeout(() => {
        setState((prevState) => ({ ...prevState, time: prevState.time - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state.time === 0) {
      handleTimesUp();
    }
  }, [state.time, state.showNotification]);

  const handleCharacterClick = (char, index) => {
    if (
      state.selectedIndices.length <
      questions[state.currentQuestion].word.length
    ) {
      setState((prevState) => ({
        ...prevState,
        selectedIndices: [...prevState.selectedIndices, index],
        filledWord: prevState.filledWord + char,
      }));
    }
  };

  useEffect(() => {
    if (
      state.filledWord.length === questions[state.currentQuestion].word.length
    ) {
      if (state.filledWord === questions[state.currentQuestion].word) {
        setState((prevState) => ({
          ...prevState,
          score: prevState.score + 1,
          notification: "Awesome!",
          showNotification: true,
        }));
        setTimeout(() => handleNextQuestion(), 3000);
      } else {
        triggerShakeEffect();
      }
    }
  }, [state.filledWord]);

  const handleTimesUp = () => {
    setState((prevState) => ({
      ...prevState,
      // notification: "Time's Up!",
      showNotification: true,
    }));
    setTimeout(() => handleNextQuestion(), 2000);
  };

  console.log(state.currentQuestion);
  console.log(questions.length);

  const handleNextQuestion = () => {
    if (state.currentQuestion < questions.length - 1) {
      setState((prevState) => ({
        ...prevState,
        currentQuestion: prevState.currentQuestion + 1,
        selectedIndices: [],
        filledWord: "",
        time: 120,
        notification: "",
        showNotification: false,
      }));
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setState((prevState) => ({
      ...prevState,
      // notification: `Game Over! Your score: ${prevState.score}`,
      notification: "times up!",
      desc: "You are...<br />out of time",
      showNotification: true,
    }));
    localStorage.removeItem("gameState");
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

  const availableCharacters =
    questions[state.currentQuestion].scrambled.split("");

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center text-main relative z-10">
        {!state.showNotification && (
          <>
            <div className="text-[10rem] mt-[1vh] font-uptos text-main">
              {state.time}
            </div>

            <div
              className={`flex justify-center mt-[3vh] gap-4 ${
                state.shake ? "shake" : ""
              }`}
            >
              {questions[state.currentQuestion].word
                .split("")
                .map((_, index) => (
                  <div
                    key={index}
                    className="text-4xl border-b-[.5vh] border-main w-[10vw] h-10 flex items-center justify-center"
                  >
                    {state.filledWord[index] || ""}
                  </div>
                ))}
            </div>

            <div className="flex justify-center mt-[2vh]">
              {availableCharacters.map((char, index) => (
                <button
                  key={index}
                  onClick={() => handleCharacterClick(char, index)}
                  disabled={state.selectedIndices.includes(index)}
                  className={`bg-gold text-main text-[5rem] rounded ${
                    state.selectedIndices.includes(index)
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
          <h1 className="text-[8rem]">{state.notification}</h1>
          <p
            className="text-[5rem]"
            dangerouslySetInnerHTML={{ __html: state.desc }}
          ></p>
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
