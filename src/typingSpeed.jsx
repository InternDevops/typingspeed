import React, { useState, useEffect } from "react";

const TypingSpeedTest = () => {
  const textToType = "The quick brown fox jumps over the lazy dog";
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChange = (e) => {
    if (!isRunning) {
      setStartTime(new Date());
      setIsRunning(true);
    }

    setUserInput(e.target.value);

    if (e.target.value === textToType) {
      setIsRunning(false);
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    if (isRunning && userInput.length > 0) {
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const elapsedTime = (new Date() - startTime) / 60000;
      setWpm(elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0);

      const correctChars = userInput.split("").filter((char, index) => char === textToType[index]).length;
      setAccuracy(Math.round((correctChars / textToType.length) * 100));
    }
  }, [userInput, isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 || isCompleted) {
      setIsRunning(false);
    }
  }, [timeLeft, isRunning, isCompleted]);

  const resetTest = () => {
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(30);
    setIsRunning(false);
    setIsCompleted(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Typing Speed Test</h1>
      <p className="text-lg bg-gray-800 p-4 rounded-md">{textToType}</p>
  
      <textarea
        className="mt-4 p-2 border-2 border-gray-500 rounded-md text-white w-full h-20"
        placeholder="Start typing here..."
        value={userInput}
        onChange={handleChange}
        disabled={isCompleted}
      />
  
      <div className="mt-4 text-center">
        <p className="text-lg">Words per Minute: <span className="font-bold">{wpm}</span></p>
        <p className="text-lg">Accuracy: <span className="font-bold">{accuracy}%</span></p>
        <p className="text-lg">Time Left: <span className="font-bold">{timeLeft}s</span></p>
        {isCompleted && <p className="text-green-500 font-bold mt-2">✅ Test Completed!</p>}
      </div>
  
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-blue rounded hover:bg-blue-700"
        onClick={resetTest}
      >
        Reset Test
      </button>
    </div>
  );
  
};

export default TypingSpeedTest;
