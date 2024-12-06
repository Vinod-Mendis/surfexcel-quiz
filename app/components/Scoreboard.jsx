/** @format */

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Scoreboard({ scores, showWinner }) {
  // Find the player with the highest score
  const highestScorePlayer = scores.reduce(
    (max, current) => (current.score > max.score ? current : max),
    scores[0]
  );

  return (
    <motion.div
      initial={{ backdropFilter: "blur(0px)" }}
      animate={{ backdropFilter: "blur(20px)" }}
      transition={{ duration: 0.5 }}
      className="absolute z-10 w-screen h-screen flex justify-center items-center">
      {!showWinner ? (
        <motion.div
          key="score"
          initial={{ scale: 0 }} // Start scale
          animate={{ scale: 1 }} // End scale
          transition={{ duration: 1, ease: "easeInOut" }} // Animation settings
          className="absolute z-30 top-28">
          <Image src={"/scores.png"} width={400} height={400} alt="scores" />
        </motion.div>
      ) : (
        <motion.div
          key="winner"
          initial={{ scale: 0 }} // Start scale
          animate={{ scale: 1 }} // End scale
          transition={{ duration: 0.5, ease: "easeInOut" }} // Animation settings
          className="absolute z-30 top-28">
          <Image src={"/winner.png"} width={500} height={500} alt="scores" />
        </motion.div>
      )}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-[1000px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-visible relative flex flex-col pt-12 px-10">
        <div className="flex justify-between text-4xl font-semibold text-yellow-500 py-4 border-b-2">
          <h1 className="text-left">Player</h1>
          <h1 className="text-right">Score</h1>
        </div>
        <div className="flex flex-col">
          {scores.map((member, index) => (
            <div
              key={index}
              className={`flex border-b-2 justify-between text-center text-4xl font-semibold py-4 px-8 transition-colors duration-500 ease-in-out ${
                showWinner &&
                member.score !== 0 &&
                member.score === highestScorePlayer.score
                  ? "bg-yellow-300"
                  : ""
              }`}>
              <h1 className="text-left">{member.player}</h1>
              <h1 className="text-right">{member.score}</h1>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
