/** @format */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Timer from "./components/Timer";
import Image from "next/image";
import Scoreboard from "./components/Scoreboard";
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
    { player: 1, score: 0 },
    { player: 2, score: 0 },
    { player: 3, score: 0 },
    { player: 4, score: 0 },
    { player: 5, score: 0 },
    { player: 6, score: 0 },
  ]);
  const [lockedPlayer, setLockedPlayer] = useState(null); // State to track locked player
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  console.log("selected question: ", selectedQuestion);
  console.log("Temp Question: ", questionTemp);
  console.log("Question : ", question);
  console.log("_________________________________________");
  console.log("winner: ", showWinner);

  socket.on("handleSelectQuestionServer", (index) => {
    console.log("question from server: ", index);
    setQuestionIndex(index);
    setSelectedQuestion(data[index]); // Update selectedQuestion for other potential uses
    setQuestionTemp(data[index]);
  });

  socket.on("showQuestionServer", () => {
    showQuestion();
  });

  socket.on("showScoreboardServer", (boolean, score) => {
    console.log("showScoreboardServer");
    setShowScoreboard(boolean);
  });

  socket.on("showWinnerServer", () => {
    setShowWinner(true);
  });

  socket.on("resetBtnServer", () => {
    reset();
  });

  socket.on("displayIdleServer", () => {
    displayIdle();
  });

  socket.on("goToPreviousQuestionServer", () => {
    goToPreviousQuestion();
  });

  socket.on("goToNextQuestionServer", () => {
    goToNextQuestion();
  });

  socket.on("timerStartServer", () => {
    timerStart();
  });

  socket.on("handleChangeOptionServer", (data) => {
    handleChange(data);
  });

  socket.on("showCorretAnswerServer", () => {
    showCorretAnswer();
  });

  socket.on("showWrongAnswerServer", () => {
    showWrongAnswer();
  });

  socket.on("handleLockPlayerServer", (data) => {
    handleLockPlayer(data);
  });

  socket.on("handleScoreChangeServer", (newScores) => {
    // Simply update with the new scores array
    setScores(newScores);
  });

  socket.on("timerStop", () => {
    setIsActive(false);
  });

  // useEffect(() => {
  //   console.log(showScoreboard)
  // },[showScoreboard])

  // useEffect(() => {
  //   axios.get('http://localhost:3002/questions')
  //     .then((response) => {
  //       setData(response.data.level03);
  //       console.log(response.data.level03);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const reset = () => {
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
    setTimeIsOver(false);
  };

  const showCorretAnswer = () => {
    // show correct answer function
    setShowCorrect(true);
    resetTimer();
  };
  const showWrongAnswer = () => {
    // show wrong answer function
    setShowWrong(true);
    resetTimer();
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
  };

  // const handleChange = (event) => {
  //   // function to select the option using dropdown
  //   setSelectedOption(event.target.value);
  // };

  const handleChange = (data) => {
    // function to select the option using dropdown
    setSelectedOption(data);
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
    console.log(questionIndex);
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
  };

  // const handleScoreChange = (index, increment) => {
  //   // function to change the score of each player
  //   setScores((prevScores) => {
  //     return prevScores.map((member, idx) => {
  //       if (idx === index) {
  //         // Increment or decrement the score by 20
  //         const newScore = increment
  //           ? member.score + 20
  //           : Math.max(member.score - 20, 0);
  //         return { ...member, score: newScore };
  //       }
  //       return member;
  //     });
  //   });
  // };

  const handleScoreChange = (scoress) => {
    // function to change the score of each player
    setScores(scoress);
  };

  const timerStart = () => {
    // timer start function
    setIsActive(true);
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
    <div className="bg-gradient-to-bl from-blue-500  via-[#05004a] to-pink-200 w-screen h-screen overflow-hidden flex flex-col justify-center items-center relative">
      {/* Score Board */}
      {showScoreboard && <Scoreboard scores={scores} showWinner={showWinner} />}

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
                    <div className="flex flex-col items-center gap-10">
                      <motion.div
                        key={`question-${questionKey}`} // Use the dynamic key
                        className="bg-gradient-to-bl from-blue-300  to-[#0b00a8] w-[1400px] h-64  rounded-3xl flex justify-center items-center text-center text-white text-5xl font-semibold px-6 py-4 border-[4px] border-white shadow-2xl"
                        initial={{ opacity: 0 }} // Initial state: fully transparent
                        animate={{ opacity: 1 }} // Final state: fully opaque
                        transition={{ duration: 0.5, delay: 2 }} // 2-second delay before animation starts
                      >
                        <h3 className="leading-normal">
                          {question && question.question}
                        </h3>
                      </motion.div>

                      {/* Options */}
                      <div className="flex flex-wrap justify-between w-[1400px] gap-5 font-semibold">
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
                                      width: "678px", // Initial width
                                      height: "158px", // Initial height
                                      borderRadius: "16px", // Initial border radius
                                    }}
                                    animate={{
                                      width: ["678px", "700px", "678px"], // Animates width
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
                                  option.value.length < 30
                                    ? "text-5xl"
                                    : "text-3xl"
                                } border-[3px]  shadow-2xl  w-[680px] h-[160px] rounded-2xl  flex relative items-center px-5 gap-10`}>
                                <p>{option.label}.</p>
                                <p>{option.value}</p>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Timer */}
                  {showCorrect && !timeIsOver ? (
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
                  ) : showCorrect && timeIsOver ? (
                    <motion.div
                      initial={{ scale: 0 }} // Start scale
                      animate={{ scale: 1 }} // End scale
                      transition={{ duration: 0.5, ease: "easeInOut" }} // Animation settings
                      className="absolute bottom-10">
                      <Image
                        src={"/bad_luck.png"}
                        width={700}
                        height={700}
                        alt="wrong answer text"
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
