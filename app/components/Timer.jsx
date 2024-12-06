/** @format */

import { useState, useEffect } from "react";

function Timer({
  isActive,
  onTimeRemainingChange,
  onTimeFinished,
  appearDelay,
}) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); // Start countdown from 30 seconds

  useEffect(() => {
    if (!isActive) return;

    const duration = 30 * 1000; // 30 seconds in milliseconds
    const interval = 50; // Update interval in milliseconds

    let startTime = Date.now();

    const timer = setInterval(() => {
      const timeElapsed = Date.now() - startTime;
      const newProgress = (timeElapsed / duration) * 100;
      const newTimeRemaining = Math.ceil(30 - timeElapsed / 1000); // Countdown from 30 seconds

      if (newProgress >= 100 || newTimeRemaining <= 0) {
        setProgress(100);
        setTimeRemaining(0);
        clearInterval(timer);
        if (onTimeFinished) {
          onTimeFinished(); // Notify parent when the timer finishes
        }
      } else {
        setProgress(newProgress);
        setTimeRemaining(newTimeRemaining);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isActive]);

  // Pass timeRemaining to the parent via the callback
  useEffect(() => {
    if (onTimeRemainingChange) {
      onTimeRemainingChange(timeRemaining); // Pass timeRemaining to the parent
    }
  }, [timeRemaining, onTimeRemainingChange]);

  return (
    <div
      className="w-[1200px] absolute bottom-10 fade-in "
      style={{ "--fade-delay": `${appearDelay}s` }}>
      <div className="w-full border-4 border-red-500 rounded-full p-3">
        <div className="h-4 w-full bg-red-500 bg-opacity-30 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-red-500 transition-all duration-100 rounded-full"
          />
        </div>
      </div>
      <div className="text-center uppercase text-white mt-4">
        <p className="text-2xl font-semibold">
          You have{" "}
          <span className="text-5xl mx-4 font-bold">{timeRemaining}</span>{" "}
          seconds
        </p>
      </div>
    </div>
  );
}

export default Timer;
