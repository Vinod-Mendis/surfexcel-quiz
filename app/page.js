/** @format */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Timer from "./components/Timer";
import Image from "next/image";

const data = [
  {
    question: "What is your name?",
    correctAnswer: "A",
    options: [
      { label: "A", value: "Jason" },
      { label: "B", value: "Mark" },
      { label: "C", value: "Steve" },
      { label: "D", value: "Clark" },
    ],
  },
  {
    question: "What is your age?",
    correctAnswer: "B",
    options: [
      { label: "A", value: "61" },
      { label: "B", value: "18" },
      { label: "C", value: "53" },
      { label: "D", value: "12" },
    ],
  },
];

export default function Page() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [showIdle, setShowIdle] = useState(false);
  const [resetScreen, setResetScreen] = useState(true); // idle *
  const [showIdle2, setShowIdle2] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionTemp, setQuestionTemp] = useState({
    question: "What is your name?",
    correctAnswer: "A",
    options: [
      { label: "A", value: "Jason" },
      { label: "B", value: "Mark" },
      { label: "C", value: "Steve" },
      { label: "D", value: "Clark" },
    ],
  });

  const [question, setQuestion] = useState({
    question: "What is your name?",
    correctAnswer: "A",
    options: [
      { label: "A", value: "Jason" },
      { label: "B", value: "Mark" },
      { label: "C", value: "Steve" },
      { label: "D", value: "Clark" },
    ],
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [scores, setScores] = useState([
    { player: "A", score: 0 },
    { player: "B", score: 0 },
    { player: "C", score: 0 },
    { player: "D", score: 0 },
    { player: "E", score: 0 },
    { player: "F", score: 0 },
  ]);
  const [lockedPlayer, setLockedPlayer] = useState(null); // State to track locked player
  console.log("selected question: ", selectedQuestion);
  console.log("Temp Question: ", questionTemp);
  console.log("Question : ", question);
  console.log("_________________________________________");

  const reset = () => {
    setResetScreen(true);
    setShowStartScreen(true);
    setIsActive(false);
    setSelectedOption(null);
    setQuestionTemp({
      question: "What is your name?",
      correctAnswer: "A",
      options: [
        { label: "A", value: "Jason" },
        { label: "B", value: "Mark" },
        { label: "C", value: "Steve" },
        { label: "D", value: "Clark" },
      ],
    });
    setQuestionIndex(0);
    setScores([
      { player: "A", score: 0 },
      { player: "B", score: 0 },
      { player: "C", score: 0 },
      { player: "D", score: 0 },
      { player: "E", score: 0 },
      { player: "F", score: 0 },
    ]);
    setLockedPlayer(null); // Reset locked player
    setShowCorrect(false);
    setShowWrong(false);
    setShowIdle(false);
    setShowIdle2(false);
  };

  const showCorretAnswer = () => {
    setShowCorrect(true);
  };
  const showWrongAnswer = () => {
    setShowWrong(true);
  };
  const displayIdle = () => {
    setResetScreen(false);
    setShowIdle(true);
    setShowIdle2(true);
    setShowStartScreen(false);
    setShowCorrect(false);
    setShowWrong(false);
    setSelectedOption(null);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const goToNextQuestion = () => {
    if (questionIndex < data.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setQuestionTemp(data[nextIndex]); // Update questionTemp with the new question
    }
  };

  const goToPreviousQuestion = () => {
    if (questionIndex > 0) {
      const prevIndex = questionIndex - 1;
      setQuestionIndex(prevIndex);
      setQuestionTemp(data[prevIndex]); // Update questionTemp with the previous question
    }
  };

  const handleSelectQuestion = (event) => {
    const selectedIndex = parseInt(event.target.value); // Get the selected index
    setQuestionIndex(selectedIndex);
    setSelectedQuestion(data[selectedIndex]); // Update selectedQuestion for other potential uses
    setQuestionTemp(data[selectedIndex]); // Directly update questionTemp
  };

  const handleLockPlayer = (player) => {
    setLockedPlayer(player); // Set the locked player when button is clicked
  };

  const handleScoreChange = (index, increment) => {
    setScores((prevScores) => {
      return prevScores.map((member, idx) => {
        if (idx === index) {
          // Increment or decrement the score by 20
          const newScore = increment
            ? member.score + 20
            : Math.max(member.score - 20, 0);
          return { ...member, score: newScore };
        }
        return member;
      });
    });
  };

  const timerStart = () => {
    setIsActive(true);
  };
  const showQuestion = () => {
    setShowIdle(false);
    setShowStartScreen(false);
    if (resetScreen) {
      setShowIdle2(false);
    } else {
      setShowIdle2(true);
    }
    setQuestion(questionTemp);
  };

  return (
    <div className=" w-screen h-screen overflow-hidden flex flex-col justify-center items-center relative">
      {/*Left Menu */}
      <div className="flex flex-col absolute top-0 left-0 m-5 bg-white p-4 rounded-xl w-56 gap-4">
        {scores.map((member, index) => (
          <div
            key={index}
            className={`w-full flex flex-col gap-2 text-xl border-b pb-2 rounded-lg ${
              lockedPlayer === member.player ? "bg-yellow-400" : "bg-white"
            }`}>
            <h1 className="font-semibold">{member.player} :</h1>
            <div className="w-full flex gap-5 text-xl items-center">
              <button
                className="w-full bg-red-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
                onClick={() => handleScoreChange(index, false)}>
                -
              </button>
              <p>{member.score}</p>
              <button
                className="w-full bg-green-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
                onClick={() => handleScoreChange(index, true)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {/*Right Menu */}
      <div className="flex flex-col gap-5 absolute top-0 right-0 m-5 overflow-scroll max-h-screen">
        <div className="flex flex-col bg-white p-4 rounded-xl w-56 gap-4">
          {/* IDLE Button */}
          <button
            className="w-full bg-green-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
            onClick={displayIdle}>
            IDLE
          </button>
          {/* Reset Button */}
          <button
            className="w-full bg-red-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
            onClick={reset}>
            Reset
          </button>
          <div className="flex flex-col gap-2">
            <p>Q : {questionTemp.question}</p>
            <p>A : {questionTemp.correctAnswer}</p>
          </div>
          {/* Dropdown to Select Question */}
          <select
            onChange={handleSelectQuestion}
            value={questionIndex} // Sync with questionIndex
            className="bg-white rounded-lg p-3 text-xl border border-gray-300 shadow-lg w-full cursor-pointer">
            {data.map((_, index) => (
              <option key={index} value={index}>
                Question {index + 1}
              </option>
            ))}
          </select>

          <div className="flex gap-5">
            {/* Navigation Buttons */}
            <button
              onClick={goToPreviousQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 shadow-lg w-full cursor-pointer active:scale-90 transition"
              disabled={questionIndex === 0}>
              Previous
            </button>
            <button
              onClick={goToNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 shadow-lg w-full cursor-pointer active:scale-90 transition"
              disabled={questionIndex === data.length - 1}>
              Next
            </button>
          </div>
          <button
            onClick={showQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 shadow-lg w-full cursor-pointer active:scale-90 transition">
            Show
          </button>
          <button
            onClick={timerStart}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 shadow-lg w-full cursor-pointer active:scale-90 transition">
            Start Timer
          </button>
          {/* Dropdown Menu for Selecting Option */}
          <div>
            <select
              onChange={handleChange}
              className="bg-white rounded-lg p-3 text-xl border border-gray-300 shadow-lg w-full cursor-pointer">
              <option value="">Select an option</option>
              {data[questionIndex].options.map((option, optionIndex) => (
                <option key={optionIndex} value={option.label}>
                  {option.label}. {option.value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p>Q : {question.question}</p>
            <p>A : {question.correctAnswer}</p>
          </div>
          <button
            onClick={showCorretAnswer}
            className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 shadow-lg w-full cursor-pointer active:scale-90 transition">
            Correct
          </button>
          <button
            onClick={showWrongAnswer}
            className="bg-red-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 shadow-lg w-full cursor-pointer active:scale-90 transition">
            Wrong
          </button>
        </div>
        <div className="flex flex-col bg-white p-4 rounded-xl w-56 gap-4">
          {/* Lock Player */}
          <h1 className="font-semibold text-xl">Lock Player</h1>
          {scores.map((member, index) => (
            <button
              key={index}
              onClick={() => handleLockPlayer(member.player)} // Lock the player
              className={`w-full font-semibold rounded-lg p-2 active:scale-90 transition ${
                lockedPlayer === member.player
                  ? "bg-yellow-600 text-white" // Highlight locked player
                  : "bg-yellow-500 text-white"
              }`}>
              {member.player}
            </button>
          ))}
        </div>
      </div>

      {showStartScreen ? (
        <motion.div
          initial={{ scale: 0 }} // Start scale
          animate={{ scale: 1 }} // End scale
          transition={{ duration: 1, ease: "easeInOut" }} // Animation settings
        >
          <Image
            src={"/start_screen_logo.png"}
            width={900}
            height={900}
            alt="surfexcel logo"
          />
        </motion.div>
      ) : (
        <>
          {showIdle ? (
            <motion.div
              initial={{ scale: 0 }} // Start scale
              animate={{ scale: 1 }} // End scale
              transition={{ duration: 1, ease: "easeInOut" }} // Animation settings
            >
              <Image
                src={"/surfexcel_logo.png"}
                width={700}
                height={700}
                alt="surfexcel logo"
              />
            </motion.div>
          ) : (
            <>
              {showIdle2 ? (
                <motion.div
                  initial={{ scale: 1 }} // Start scale
                  animate={{ scale: 0 }} // End scale
                  transition={{ duration: 1, ease: "easeInOut" }} // Animation settings
                  className="absolute z-10">
                  <Image
                    src={"/surfexcel_logo.png"}
                    width={700}
                    height={700}
                    alt="surfexcel logo"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 1 }} // Start scale
                  animate={{ scale: 0 }} // End scale
                  transition={{ duration: 1, ease: "easeInOut" }} // Animation settings
                  className="absolute z-10">
                  <Image
                    src={"/start_screen_logo.png"}
                    width={900}
                    height={900}
                    alt="surfexcel logo"
                  />
                </motion.div>
              )}
              {/* Scores */}
              <motion.div
                className="flex justify-around items-center w-[1400px] h-44 rounded-b-3xl bg-white absolute"
                initial={{ top: -180 }} // Start position above the screen
                animate={{ top: !showIdle ? 0 : -100 }} // Trigger animation based on state
                transition={{ duration: 0.5, ease: "easeInOut", delay: 4 }} // Apply ease-in-out timing function
              >
                {scores.map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 justify-center items-center">
                    <div
                      className={`flex w-16 h-16 justify-center items-center text-center text-3xl font-bold rounded-full text-white ${
                        lockedPlayer === member.player
                          ? "bg-yellow-500 bounce"
                          : "bg-blue-600"
                      } `}>
                      <p>{member.player}</p>
                    </div>
                    <p className="text-6xl font-bold text-pink-500">
                      {member.score}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Question and answers */}
              <div>
                {/* Display Current Question */}
                <div className="flex flex-col gap-10">
                  <motion.div
                    className="bg-white w-[1200px] h-44 rounded-3xl flex justify-center items-center text-center text-4xl"
                    initial={{ opacity: 0 }} // Initial state: fully transparent
                    animate={{ opacity: 1 }} // Final state: fully opaque
                    transition={{ duration: 0.5, delay: 2 }} // 2-second delay before animation starts
                  >
                    <h3>{question.question}</h3>
                  </motion.div>

                  {/* Options */}
                  <div className="flex flex-wrap justify-between w-[1200px] gap-10">
                    {question.options.map((option, optionIndex) => (
                      <motion.div
                        className="flex justify-center items-center relative"
                        key={optionIndex}
                        initial={{ opacity: 0 }} // Initial state: invisible
                        animate={{ opacity: 1 }} // Final state: fully visible
                        transition={{
                          duration: 0.5, // Animation duration
                          delay: 3 + optionIndex * 0.2, // Add staggered delay for each option
                        }}>
                        {!showCorrect &&
                          !showWrong &&
                          selectedOption === option.label && (
                            <motion.div
                              className="bg-pink-300 absolute"
                              initial={{
                                width: "498px", // Initial width
                                height: "78px", // Initial height
                                borderRadius: "12px", // Initial border radius
                              }}
                              animate={{
                                width: ["498px", "520px", "498px"], // Animates width
                                height: ["78px", "100px", "78px"], // Animates height
                                borderRadius: ["12px", "16px", "12px"], // Animates border radius
                              }}
                              transition={{
                                duration: 1, // Total duration for one full cycle
                                repeat: Infinity, // Repeats infinitely
                                repeatType: "loop", // Loops the animation seamlessly
                              }}
                            />
                          )}

                        <div
                          className={`${
                            showCorrect &&
                            question.correctAnswer === option.label &&
                            selectedOption === option.label
                              ? "bg-green-500 text-white scale-up" // Apply green background when showCorrect is true
                              : showWrong &&
                                question.correctAnswer !== option.label &&
                                selectedOption === option.label
                              ? "bg-red-500 text-white scale-up" // Apply red background when showWrong is true and answer is incorrect
                              : selectedOption === option.label
                              ? "bg-pink-400 text-white" // Apply pink background when selectedOption matches
                              : "bg-white" // Default background when neither condition is true
                            // Default background when neither condition is true
                          }  w-[500px] h-[80px] rounded-xl text-2xl flex relative items-center pl-10 gap-10`}>
                          <p>{option.label}.</p>
                          <p>{option.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <Timer isActive={isActive} />
            </>
          )}
        </>
      )}
    </div>
  );
}
