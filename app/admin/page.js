/** @format */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Timer from "../components/Timer";
import Image from "next/image";
import Scoreboard from "../components/Scoreboard";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io("http://localhost:3002");

export default function Page() {
  const [data, setData] = useState([
    {
      question: "සර්ෆ් එක්සෙල් වලින් ඉවත්වන පැල්ලම් මේ අතරින් මොනවාද?",
      correctAnswer: "D",
      options: [
        {
          label: "A",
          value: "මඩ පැල්ලම්",
        },
        {
          label: "B",
          value: "තීන්ත පැල්ලම්",
        },
        {
          label: "C",
          value: "වියලි තද පැල්ලම්",
        },
        {
          label: "D",
          value: "ඉහත සියල්ලම",
        },
      ],
    },
    {
      question: "සර්ෆ් එක්සෙල් වල අඩංගු fragrance වර්ගය මින් කුමක්ද?",
      correctAnswer: "A",
      options: [
        {
          label: "A",
          value: "comfort ප්‍රිමියම් සුවද",
        },
        {
          label: "B",
          value: "රෝයල් ලැවන්ඩර් සුවද",
        },
        {
          label: "C",
          value: "clean ඇන්ඩ් රොස් Fresh සුවද",
        },
        {
          label: "D",
          value: "Clean ජැස්මින් සුවද",
        },
      ],
    },
    {
      question:
        "රෙදි සේදීමට පෙර ඔබ සලකා බැලිය යුතු කරුණු ඇතුලත් නිවැරදි ප්‍රකාශය කුමක්ද?",
      correctAnswer: "A",
      options: [
        {
          label: "A",
          value:
            "බර, වර්ණය, සේදුම් කුඩු ප්‍රමාණය, අනවශ්‍ය ද්‍රව්‍ය සාක්කු වල තිබීම",
        },
        {
          label: "B",
          value: "ඇදුම්වල සුවද, වර්ණය, සේදුම් කුඩු ප්‍රමාණය",
        },
        {
          label: "C",
          value: "ඇදුම්වල හැඩය, අනවශ්‍ය ද්‍රව්‍ය සාක්කු වල තිබීම, බර",
        },
        {
          label: "D",
          value: "රෙදිවල කාලය, රෙදි වල දිග, රෙදිවල හැඩය, බර",
        },
      ],
    },
    {
      question:
        "සර්ෆ් එක්සෙල් සමගින් රෙදි කන්දක් සේදීමට ඔබට අවශ්‍ය වන්නේ හැදි කොපමණ ප්‍රමාණයක්ද?",
      correctAnswer: "C",
      options: [
        {
          label: "A",
          value: "හැදි 3ක්",
        },
        {
          label: "B",
          value: "හැදි 1ක්",
        },
        {
          label: "C",
          value: "හැදි බාගයක්",
        },
        {
          label: "D",
          value: "හැදි 2ක්",
        },
      ],
    },
    {
      question:
        "රෙදි සේදීමේදී ඔබ අනුගමනය කල යුතු පියවරක්  නොවන්නේ මින් කුමක්ද?",
      correctAnswer: "C",
      options: [
        {
          label: "A",
          value: "ඇඳුම්වල care label එක පරීක්ෂා කරන්න",
        },
        {
          label: "B",
          value: "වර්ණ හා රෙදි වර්ගය අනුව ඇඳුම් වර්ග කරන්න.",
        },
        {
          label: "C",
          value: "සියලුම ඇඳුම් එකට ඩිටර්ජන්ට් එකට පොඟවා ගන්න.",
        },
        {
          label: "D",
          value:
            "රෙදි සෝදන යන්ත්‍රයේ සදහන් කර ඇති උපරිම රෙදි ධාරිතාව පරීක්ෂා කරන්න",
        },
      ],
    },
    {
      question: "ඇදුම්වල ඇති care label එක යනු කුමක්ද?",
      correctAnswer: "A",
      options: [
        {
          label: "A",
          value: "සේදීම, වියළීම සහ නඩත්තු උපදෙස් සපයන ලේබලයක්",
        },
        {
          label: "B",
          value: "ඇඳුමේ ප්‍රමාණය සහ වෙළඳ නාමය දැක්වෙන ලේබලයක්.",
        },
        {
          label: "C",
          value: "ඇඳුමේ හැඩය පිළිබද පමණක් දැක්වෙන ලේබයක්.",
        },
        {
          label: "D",
          value: "ඇඳුමේ දිග පළල පිළිබද දැක්වෙන ලේබයක්",
        },
      ],
    },
    {
      question: "ඇදුම්වල ඇති care label එක වැදගත් වන්නේ ඇයි?",
      correctAnswer: "D",
      options: [
        {
          label: "A",
          value: "ඇඟලුම්වල මූල්‍යමය වටිනාකම දැනගැනීමට",
        },
        {
          label: "B",
          value: "ඇඟලුම්වල ප්‍රමාණය දැනගැනීමට",
        },
        {
          label: "C",
          value: "ඇඟලුම්වල අයිතිකරු සොයාගැනීමට",
        },
        {
          label: "D",
          value: "ඇඟලුම් දිගුකල් පවත්වාගැනීමට අවශ්‍ය උපදෙස් සපයන නිසා",
        },
      ],
    },
    {
      question: "සේදීමට පෙර ඇඳුම් වර්ණ අනුව වර්ග කළ යුත්තේ ඇයි?",
      correctAnswer: "B",
      options: [
        {
          label: "A",
          value: "ඇදුම් නැමීමේදී කාලය ඉතිරි කර ගැනීම",
        },
        {
          label: "B",
          value: "ලා පාට රෙදි මතට තද පාට රෙදි වල වර්ණ මුසුවීම වැලැක්වීමට",
        },
        {
          label: "C",
          value: "සිමෙන්ති නිෂ්පාදනයසේදීමේදී ඇදුම් පොඩිවීම වැලැක්වීමට",
        },
        {
          label: "D",
          value: "සේදීමේදී ඇදුම්වල සුවද එකින් එකට මුසුවීම වැලැක්වීමට",
        },
      ],
    },
    {
      question: "රෙදි සෝදන යන්ත්‍රයන්වල මූලික වර්ග දෙක මොනවාද?",
      correctAnswer: "A",
      options: [
        {
          label: "A",
          value: "Top Load & Front Load",
        },
        {
          label: "B",
          value: "Side Load & Front Load",
        },
        {
          label: "C",
          value: "Back load & front load",
        },
        {
          label: "D",
          value: "Top Load & Side Load",
        },
      ],
    },
    {
      question:
        "රෙදි සෝදන කුඩු වර්ගයක් තෝරාගැනීමේදී සැලකිලිමත් විය යුතු කරුණක් වන්නේ මින් කුමක්ද?",
      correctAnswer: "D",
      options: [
        {
          label: "A",
          value: "සුවද",
        },
        {
          label: "B",
          value: "ඉක්මනින් පැල්ලම් ඉවත් කිරීමේ හැකියාව",
        },
        {
          label: "C",
          value:
            "අඩු ප්‍රමාණයකින් වැඩි රෙදි සංඛ්‍යාවක් පිරිසිදු කරගැනීමේ හැකියාව",
        },
        {
          label: "D",
          value: "ඉහත සියල්ලම",
        },
      ],
    },
    {
      question:
        "රෙදි සේදීමේදී වඩාත් හොද ප්‍රතිඵලයක් ලබාගැනීම සදහා ජල උෂ්ණත්වය සාමාන්‍යයෙන් තබාගත යුත්තේ කුමන අගයකද?",
      correctAnswer: "B",
      options: [
        {
          label: "A",
          value: "සෙල්සියස් අංශක 25",
        },
        {
          label: "B",
          value: "සෙල්සියස්  අංශක 70",
        },
        {
          label: "C",
          value: "සෙල්සියස්  අංශක 30",
        },
        {
          label: "D",
          value: "සෙල්සියස්  අංශක 50",
        },
      ],
    },
    {
      question:
        "රෙදි සේදීමේදී වෙනත් රෙදි සෝදන කුඩු ග්‍රෑම් 60 ක් අවශ්‍ය වුවත් සර්ෆ් එක්සෙල් වලින් අවශ්‍ය වන්නේ ග්‍රෑම් කීයද?",
      correctAnswer: "C",
      options: [
        {
          label: "A",
          value: "ග්‍රෑම් 120ක්",
        },
        {
          label: "B",
          value: "ග්‍රෑම් 150ක්",
        },
        {
          label: "C",
          value: "ග්‍රෑම් 30ක්",
        },
        {
          label: "D",
          value: "ග්‍රෑම් 75ක්",
        },
      ],
    },
    {
      question:
        "එක් වරකට ග්‍රෑම් 30ක් රෙදි සේදීමට භාවිතා කරන්නේ නම් සර්ෆ් එක්සෙල් කිලෝග්‍රෑම් 1 පැකට්ටුවකින් කී වතාවක් රෙදි සේදිය හැකිද?",
      correctAnswer: "D",
      options: [
        {
          label: "A",
          value: "30 වතාවක්",
        },
        {
          label: "B",
          value: "35 වතාවක්",
        },
        {
          label: "C",
          value: "40 වතාවක්",
        },
        {
          label: "D",
          value: "33 වතාවක්",
        },
      ],
    },
    {
      question:
        "වෙනත් සාමාන්‍ය රෙදි සෝදන කුඩු ග්‍රෑම් 500 පැකට්ටුවක් රුපියල් 320 ත් 380ත් අතර වුවත් සර්ෆ් ඒක්සෙල් රෙදි සෝදන කුඩු ග්‍රෑම් 500 පැකට්ටුවක මිල කීයද?",
      correctAnswer: "A",
      options: [
        {
          label: "A",
          value: "රුපියල් 300යි",
        },
        {
          label: "B",
          value: "රුපියල් 310යි",
        },
        {
          label: "C",
          value: "රුපියල් 315යි",
        },
        {
          label: "D",
          value: "රුපියල් 305යි",
        },
      ],
    },
    {
      question:
        "සර්ෆ් එක්සෙල් රෙදි සෝදන කුඩු ඔබේ අතට මෘදු ස්වාභාවයක් ගෙන දෙන්නේ ඇයි?",
      correctAnswer: "B",
      options: [
        {
          label: "A",
          value: "සංයුතියේ තද අම්ල ඇති බැවින්",
        },
        {
          label: "B",
          value: "සර්ෆ් ඒක්සෙල් සංයුතියේ සමට හිතකර PH අගයක් ඇති බැවින්",
        },
        {
          label: "C",
          value: "පිරිසිදු කිරීම සදහා වැඩිකාලයක් සේදය යුතුව ඇති බැවින්",
        },
        {
          label: "D",
          value: "ඩබල් ලොක් තාක්ෂණය ඇති බැවින්",
        },
      ],
    },
    {
      question:
        "සර්ෆ් එක්සෙල් භාවිතයෙන් ඔබට ලැබෙන ප්‍රතිලාභයක් නොවන්නේ මින් කුමක්ද?",
      correctAnswer: "D",
      options: [
        {
          label: "A",
          value: "තද පැල්ලම් ඉවත් කරයි",
        },
        {
          label: "B",
          value: "ඔබේ දෑතට සුමුදුයි",
        },
        {
          label: "C",
          value: "ඇදුමේ පැහැය දිගුකල් රැකදෙයි",
        },
        {
          label: "D",
          value: "ඇදුම් දිරාපත් වේ",
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
    { player: "1", score: 0 },
    { player: "2", score: 0 },
    { player: "3", score: 0 },
    { player: "4", score: 0 },
    { player: "5", score: 0 },
    { player: "6", score: 0 },
  ]);
  const [lockedPlayer, setLockedPlayer] = useState(null); // State to track locked player
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  console.log("selected question: ", selectedQuestion);
  console.log("Temp Question: ", questionTemp);
  console.log("Question : ", question);
  console.log("_________________________________________");
  console.log("winner: ", showWinner);

  //   useEffect(() => {
  //     axios.get('http://localhost:3002/questions')
  //       .then((response) => {
  //         setData(response.data.level03);
  //         console.log(response.data.level03);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //       });
  //   }, []);

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const ShowScoreboard = () => {
    setShowScoreboard(true);
    socket.emit("showScoreboardAdmin", (!showScoreboard, scores));
  };

  const ShowWinner = () => {
    socket.emit("showWinner");
  };

  const reset = () => {
    resetAudio();
    setTimeIsOver(false);
    socket.emit("resetBtnAdmin");
    // reset function
    setResetScreen(true);
    setShowStartScreen(true);
    setIsActive(false);
    setSelectedOption(null);
    setQuestionTemp({
      question: "Sample Question?",
      correctAnswer: "A",
      options: [
        { label: "A", value: "Answer 1" },
        { label: "B", value: "Answer 2" },
        { label: "C", value: "Answer 3" },
        { label: "D", value: "Answer 4" },
      ],
    });
    setQuestionIndex(0);
    setScores([
      { player: "1", score: 0 },
      { player: "2", score: 0 },
      { player: "3", score: 0 },
      { player: "4", score: 0 },
      { player: "5", score: 0 },
      { player: "6", score: 0 },
    ]);
    setLockedPlayer(null); // Reset locked player
    setShowCorrect(false);
    setShowWrong(false);
    setShowIdle(false);
    setShowIdle2(false);
    setShowScoreboard(false);
    setShowWinner(false);
    resetTimer();
  };

  const showCorretAnswer = () => {
    socket.emit("showCorretAnswerAdmin");
    // show correct answer function
    setShowCorrect(true);
    resetTimer();
    const audio = new Audio("/sounds/correct.wav");
    audio.play();
    pauseAudio();
  };
  const showWrongAnswer = () => {
    socket.emit("showWrongAnswerAdmin");
    // show wrong answer function
    setShowWrong(true);
    resetTimer();
    const audio = new Audio("/sounds/wrong.wav");
    audio.play();
    pauseAudio();
  };
  const displayIdle = () => {
    socket.emit("displayIdleAdmin");

    // show IDLE screen function
    // setResetScreen(false);
    // setShowIdle(true);
    // setShowIdle2(true);
    // setShowStartScreen(false);
    // setShowCorrect(false);
    // setShowWrong(false);
    // setSelectedOption(null);
    // setShowScoreboard(false);
    // setShowWinner(false);
    // resetTimer();
  };

  socket.on("buttonPressed", (data) => {
    console.log("Received from server:", data);
    // Update UI or trigger actions based on data
    if (!data == 0) {
      handleLockPlayer(data.rawData);
    }
  });

  const handleChange = (event) => {
    const label = event.target.value;
    socket.emit("handleChangeOptionAdmin", label);
    // function to select the option using dropdown
    setSelectedOption(event.target.value);
  };

  const goToNextQuestion = () => {
    // navigate to the next question function
    socket.emit("goToNextQuestionAdmin");
    if (questionIndex < data.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setQuestionTemp(data[nextIndex]); // Update questionTemp with the new question
    }
  };

  const goToPreviousQuestion = () => {
    console.log(questionIndex);
    // navigate to the previous question function
    socket.emit("goToPreviousQuestionAdmin");
    if (questionIndex > 0) {
      const prevIndex = questionIndex - 1;
      setQuestionIndex(prevIndex);
      setQuestionTemp(data[prevIndex]); // Update questionTemp with the previous question
    }
  };

  const handleSelectQuestion = (event) => {
    // function to select the question using dropdown
    const selectedIndex = parseInt(event.target.value); // Get the selected index
    socket.emit("handleSelectQuestionAdmin", selectedIndex);
    setQuestionIndex(selectedIndex);
    setSelectedQuestion(data[selectedIndex]); // Update selectedQuestion for other potential uses
    setQuestionTemp(data[selectedIndex]); // Directly update questionTemp
  };

  const handleLockPlayer = (player) => {
    socket.emit("handleLockPlayerAdmin", player);
    // function to lock the player
    setLockedPlayer(player); // Set the locked player when button is clicked
    // setIsActive(false);
    // pauseAudio();
  };

  const sendScores = () => {
    socket.emit("handleScoreChangeAdmin", scores);
  };

  const handleScoreChange = (index, increment) => {
    setScores((prevScores) => {
      const newScores = prevScores.map((member, idx) => {
        if (idx === index) {
          // Increment or decrement the score by 20
          const newScore = increment
            ? member.score + 20
            : Math.max(member.score - 20, 0);
          return { ...member, score: newScore };
        }
        return member;
      });

      // Emit the new scores array immediately after updating
      socket.emit("handleScoreChangeAdmin", newScores);
      return newScores;
    });
  };

  const timerStart = () => {
    socket.emit("timerStartAdmin");
    // timer start function
    // setIsActive(true);
    playAudio();
  };

  const timerStop = () => {
    setIsActive(false);
    pauseAudio();
    socket.emit("timerStop");
  };

  const [questionKey, setQuestionKey] = useState(0);

  const showQuestion = () => {
    socket.emit("showQuestionAdmin");
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
    resetAudio();
    setSelectedOption(null);
    setTimeIsOver(false);
  };

  const [resetTrigger, setResetTrigger] = useState(0);

  const resetTimer = () => {
    setResetTrigger((prev) => prev + 1); // Update the resetTrigger to force a reset
  };

  const handleTimeFinished = () => {
    setTimeIsOver(true); // Show the timeout message when the timer finishes
  };

  return (
    <div className="bg-blue-800 w-screen h-screen overflow-hidden flex flex-col justify-center items-center relative">
      {/* Score Board */}
      {/* {showScoreboard && <Scoreboard scores={scores} showWinner={showWinner} />} */}
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
              ShowScoreboard();
            }}>
            Show SB
          </button>
          {showScoreboard && (
            <button
              className="w-full bg-yellow-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
              onClick={() => {
                setShowWinner(true);
                ShowWinner();
              }}>
              Show Winner
            </button>
          )}
          <button
            className="w-full bg-green-500 text-white font-semibold rounded-lg p-2 active:scale-90 transition"
            onClick={displayIdle}>
            IDLE / Close SB
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
          <button
            onClick={timerStop}
            className="bg-red-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 shadow-lg w-full cursor-pointer active:scale-90 transition">
            Stop Timer
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
    </div>
  );
}
