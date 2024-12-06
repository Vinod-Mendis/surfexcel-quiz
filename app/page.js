/** @format */

"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Timer from "./components/Timer";
import Image from "next/image";
import Scoreboard from "./components/Scoreboard";

export default function Page() {
  const [data, setData] = useState([
    {
      // state to store the full data array
      question: "සර්ෆ් එක්සෙල් වලින් ඉවත්වන පැල්ලම් මේ අතරින් මොනවාද?",
      correctAnswer: "D",
      options: [
        { label: "A", value: "මඩ පැල්ලම්" },
        { label: "B", value: "තීන්ත පැල්ලම්" },
        { label: "C", value: "වියලි තද පැල්ලම්" },
        { label: "D", value: "ඉහත සියල්ලම" },
      ],
    },
    {
      question:
        "වෙනත් සාමාන්‍ය රෙදි සෝදන කුඩු ග්‍රෑම් 500 පැකට්ටුවක් රුපියල් 320 ත් 380ත් අතර වුවත් සර්ෆ් ඒක්සෙල් රෙදි සෝදන කුඩු ග්‍රෑම් 500 පැකට්ටුවක මිල කීයද?",
      correctAnswer: "A",
      options: [
        { label: "A", value: "රුපියල් 300යි" },
        { label: "B", value: "රුපියල් 310යි" },
        { label: "C", value: "රුපියල් 315යි" },
        { label: "D", value: "රුපියල් 305යි" },
      ],
    },
    {
      question:
        "රෙදි සේදීමේදී ඔබ අනුගමනය කල යුතු පියවරක්  නොවන්නේ මින් කුමක්ද?",
      correctAnswer: "C",
      options: [
        { label: "A", value: "ඇඳුම්වල care label එක පරීක්ෂා කරන්න" },
        { label: "B", value: "වර්ණ හා රෙදි වර්ගය අනුව ඇඳුම් වර්ග කරන්න." },
        { label: "C", value: "සියලුම ඇඳුම් එකට ඩිටර්ජන්ට් එකට පොඟවා ගන්න." },
        {
          label: "D",
          value:
            "රෙදි සෝදන යන්ත්‍රයේ සදහන් කර ඇති උපරිම රෙදි ධාරිතාව පරීක්ෂා කරන්න",
        },
      ],
    },
  ]);
  const [showStartScreen, setShowStartScreen] = useState(true); // bool to show the start screen image/ reset image
  const [showCorrect, setShowCorrect] = useState(false); // bool to show the correct answer
  const [showWrong, setShowWrong] = useState(false); // bool to show the wrong answer
  const [showIdle, setShowIdle] = useState(false); // bool to show the opening IDLE screen
  const [resetScreen, setResetScreen] = useState(true); // bool to show whether closing animation of start screen or IDLE screen
  const [showIdle2, setShowIdle2] = useState(false); // bool to show the closing IDLE screen
  const [selectedOption, setSelectedOption] = useState(null); // state to store the selected option from the 4 answers
  const [selectedQuestion, setSelectedQuestion] = useState(null); // state to store the selected question object from the dropdown
  const [questionTemp, setQuestionTemp] = useState(
    // state to temporary store the selected question object.(by dropdown or next/prev buttons)
    data[0]
  );

  const [question, setQuestion] = useState();
  const [questionIndex, setQuestionIndex] = useState(0); // state to store the index in the hard coded data object
  const [isActive, setIsActive] = useState(false); // bool to start the timer
  const [timeIsOver, setTimeIsOver] = useState(false);
  const [scores, setScores] = useState([
    // state to store the scores of players with respective name/letter
    { player: "A", score: 0 },
    { player: "B", score: 0 },
    { player: "C", score: 0 },
    { player: "D", score: 0 },
    { player: "E", score: 0 },
    { player: "F", score: 0 },
  ]);
  const [lockedPlayer, setLockedPlayer] = useState(null); // State to track locked player
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  console.log("selected question: ", selectedQuestion);
  console.log("Temp Question: ", questionTemp);
  console.log("Question : ", question);
  console.log("_________________________________________");
  console.log("winner: ", showWinner);

  const timerAudio = useRef(new Audio("/sounds/timer_sound.mp3"));

  const playAudio = () => {
    const audio = timerAudio.current;
    if (audio) {
      audio.play().catch((err) => console.error("Audio playback error:", err));
    }
  };

  const pauseAudio = () => {
    const audio = timerAudio.current;
    if (audio) {
      audio.pause(); // Pauses playback
    }
  };

  const resetAudio = () => {
    const audio = timerAudio.current;
    if (audio) {
      audio.pause(); // Pause playback
      audio.currentTime = 0; // Reset to the beginning
    }
  };

  const reset = () => {
    // reset function
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
    setShowScoreboard(false);
    setShowWinner(false);
    resetTimer();
    resetAudio();
  };

  const showCorretAnswer = () => {
    // show correct answer function
    setShowCorrect(true);
    resetTimer();
    const audio = new Audio("/sounds/correct.wav");
    audio.play();
  };
  const showWrongAnswer = () => {
    // show wrong answer function
    setShowWrong(true);
    resetTimer();
    const audio = new Audio("/sounds/wrong.wav");
    audio.play();
  };
  const displayIdle = () => {
    // show IDLE screen function
    setResetScreen(false);
    setShowIdle(true);
    setShowIdle2(true);
    setShowStartScreen(false);
    setShowCorrect(false);
    setShowWrong(false);
    setSelectedOption(null);
    setShowScoreboard(false);
    setShowWinner(false);
    resetTimer();
    resetAudio();
  };

  const handleChange = (event) => {
    // function to select the option using dropdown
    setSelectedOption(event.target.value);
    const audio = new Audio("/sounds/lock_option.wav");
    audio.play();
  };

  const goToNextQuestion = () => {
    // navigate to the next question function
    if (questionIndex < data.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setQuestionTemp(data[nextIndex]); // Update questionTemp with the new question
    }
  };

  const goToPreviousQuestion = () => {
    // navigate to the previous question function
    if (questionIndex > 0) {
      const prevIndex = questionIndex - 1;
      setQuestionIndex(prevIndex);
      setQuestionTemp(data[prevIndex]); // Update questionTemp with the previous question
    }
  };

  const handleSelectQuestion = (event) => {
    // function to select the question using dropdown
    const selectedIndex = parseInt(event.target.value); // Get the selected index
    setQuestionIndex(selectedIndex);
    setSelectedQuestion(data[selectedIndex]); // Update selectedQuestion for other potential uses
    setQuestionTemp(data[selectedIndex]); // Directly update questionTemp
  };

  const handleLockPlayer = (player) => {
    // function to lock the player
    setLockedPlayer(player); // Set the locked player when button is clicked
    setIsActive(false);
    pauseAudio();
  };

  const handleScoreChange = (index, increment) => {
    // function to change the score of each player
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
    // timer start function
    setIsActive(true);
    playAudio();
  };

  const [questionKey, setQuestionKey] = useState(0);

  const showQuestion = () => {
    setShowIdle(false);
    setShowStartScreen(false);
    if (resetScreen) {
      setShowIdle2(false);
    } else {
      setShowIdle2(true);
    }
    setQuestion(questionTemp);
    setQuestionKey((prevKey) => prevKey + 1); // Update the key to re-trigger animation
    setShowCorrect(false);
    setShowWrong(false);
    setIsActive(false);
    setLockedPlayer(null); // Reset locked player
    resetTimer();
    setSelectedOption(null);
  };

  const [resetTrigger, setResetTrigger] = useState(0);

  const resetTimer = () => {
    setResetTrigger((prev) => prev + 1); // Update the resetTrigger to force a reset
  };

  const handleTimeFinished = () => {
    setTimeIsOver(true); // Show the timeout message when the timer finishes
  };

  return (
    <div className="bg-gradient-to-bl from-blue-500  via-[#05004a] to-pink-200 w-screen h-screen overflow-hidden flex flex-col justify-center items-center relative">
      {/* Score Board */}
      {showScoreboard && <Scoreboard scores={scores} showWinner={showWinner} />}
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
      <div className="flex flex-col gap-5 absolute z-20 top-0 right-0 m-5 overflow-scroll max-h-screen">
        <div className="flex flex-col bg-white p-4 rounded-xl w-56 gap-4">
          {/* IDLE Button */}
          <button
            className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
            onClick={() => {
              setShowScoreboard((prevState) => !prevState);
            }}>
            {showScoreboard ? "Close SB" : "Show SB"}
          </button>
          {showScoreboard && (
            <button
              className="w-full bg-yellow-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
              onClick={() => setShowWinner(true)}>
              Show Winner
            </button>
          )}
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
            <p>Q : {question && question.question}</p>
            <p>A : {question && question.correctAnswer}</p>
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
                  className="absolute">
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
                  className="absolute">
                  <Image
                    src={"/start_screen_logo.png"}
                    width={900}
                    height={900}
                    alt="surfexcel logo"
                  />
                </motion.div>
              )}
              {/* Scores
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
              </motion.div> */}
              {/* <motion.div
                initial={{ scale: 0 }} // Start scale
                animate={{ scale: 1 }} // End scale
                transition={{ duration: 1, ease: "easeInOut" }} // Animation settings
                className="absolute -top-12">
                <Image
                  src={"/start_screen_logo.png"}
                  width={250}
                  height={250}
                  alt="surfexcel logo"
                />
              </motion.div> */}

              {/* Question and answers */}
              {question && (
                <>
                  <div className="absolute top-40">
                    {/* Display Current Question */}
                    <div className="flex flex-col gap-10">
                      <motion.div
                        key={`question-${questionKey}`} // Use the dynamic key
                        className="bg-gradient-to-bl from-blue-300  to-[#0b00a8] w-[1200px] h-52  rounded-3xl flex justify-center items-center text-center text-white text-4xl font-semibold px-5 border-[4px] border-white shadow-2xl"
                        initial={{ opacity: 0 }} // Initial state: fully transparent
                        animate={{ opacity: 1 }} // Final state: fully opaque
                        transition={{ duration: 0.5, delay: 2 }} // 2-second delay before animation starts
                      >
                        <h3 className="leading-normal">
                          {question && question.question}
                        </h3>
                      </motion.div>

                      {/* Options */}
                      <div className="flex flex-wrap justify-around w-[1200px] gap-5 font-semibold">
                        {question &&
                          question.options.map((option, optionIndex) => (
                            <motion.div
                              className="flex justify-center items-center relative"
                              key={`option-${questionKey}-${optionIndex}`} // Use a unique key for each option
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
                                      height: "158px", // Initial height
                                      borderRadius: "16px", // Initial border radius
                                    }}
                                    animate={{
                                      width: ["498px", "520px", "498px"], // Animates width
                                      height: ["158px", "180px", "158px"], // Animates height
                                      borderRadius: ["16px", "20px", "16px"], // Animates border radius
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
                                  question &&
                                  question.correctAnswer === option.label
                                    ? "bg-green-500 text-white scale-up" // Apply green background when showCorrect is true
                                    : showWrong &&
                                      question.correctAnswer !== option.label &&
                                      selectedOption === option.label
                                    ? "bg-red-500 text-white scale-up" // Apply red background when showWrong is true and answer is incorrect
                                    : selectedOption === option.label
                                    ? "bg-gradient-to-bl from-pink-300  to-[#6e006e] text-white border-pink-400" // Apply pink background when selectedOption matches
                                    : "bg-gradient-to-bl from-blue-300  to-[#0b00a8] text-white border-blue-800" // Default background when neither condition is true
                                  // Default background when neither condition is true
                                } ${
                                  option.value.length < 20
                                    ? "text-4xl"
                                    : "text-3xl"
                                } border-[3px]  shadow-2xl  w-[500px] h-[160px] rounded-2xl  flex relative items-center pl-10 gap-10`}>
                                <p>{option.label}.</p>
                                <p>{option.value}</p>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Timer */}
                  {showCorrect ? (
                    <motion.div
                      initial={{ scale: 0 }} // Start scale
                      animate={{ scale: 1 }} // End scale
                      transition={{ duration: 0.5, ease: "easeInOut" }} // Animation settings
                      className="absolute bottom-10">
                      <Image
                        src={"/correct.png"}
                        width={700}
                        height={700}
                        alt="correct answer text"
                      />
                    </motion.div>
                  ) : showWrong ? (
                    <motion.div
                      initial={{ scale: 0 }} // Start scale
                      animate={{ scale: 1 }} // End scale
                      transition={{ duration: 0.5, ease: "easeInOut" }} // Animation settings
                      className="absolute bottom-10">
                      <Image
                        src={"/wrong.png"}
                        width={700}
                        height={700}
                        alt="wrong answer text"
                      />
                    </motion.div>
                  ) : timeIsOver ? (
                    <Image
                      src={"/timeup.png"}
                      width={500}
                      height={500}
                      alt="time's up text"
                      className="absolute bottom-10 shake"
                    />
                  ) : (
                    <Timer
                      isActive={isActive}
                      onTimeFinished={handleTimeFinished}
                      resetTrigger={resetTrigger} // Pass resetTrigger to Timer
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
