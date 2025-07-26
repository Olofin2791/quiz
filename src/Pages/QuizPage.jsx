import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shuffleQuestions = (questions) => {
  return [...questions].sort(() => Math.random() - 0.5);
};

const QuizPage = () => {
  const [allQuizData, setAllQuizData] = useState([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [player1Questions, setPlayer1Questions] = useState([]);
  const [player2Questions, setPlayer2Questions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [tieBreakerMode, setTieBreakerMode] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState(new Set());

  useEffect(() => {
    fetch("/data/quizData.json")
      .then((res) => res.json())
      .then((data) => setAllQuizData(data))
      .catch((err) => console.error("Error loading quiz data:", err));
  }, []);

  useEffect(() => {
    if (!timerStarted || showScore || showAnswer || !submitted) return;
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setSelectedAnswer("Time's Up");
          setShowAnswer(true);
          setTimerStarted(false);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [timerStarted, showAnswer, showScore, submitted]);

  const getCurrentQuestion = () => {
    return currentPlayer === 1
      ? player1Questions[currentIndex]
      : player2Questions[currentIndex];
  };

  const handleAnswerClick = (option) => setSelectedAnswer(option);

  const handleShowAnswer = () => {
    const currentQ = getCurrentQuestion();
    const isCorrect = selectedAnswer === currentQ.answer;
    if (isCorrect) {
      currentPlayer === 1
        ? setScore1((s) => s + 1)
        : setScore2((s) => s + 1);
      setAnswerFeedback("Correct ✅");
    } else {
      setAnswerFeedback("Wrong ❌");
    }
    setShowAnswer(true);
    setTimerStarted(false);
  };

  const getUnusedQuestions = (data, usedSet) => {
    return data.filter((q) => !usedSet.has(q.question));
  };

  const handleNext = () => {
    const player1Total = player1Questions.length;
    const player2Total = player2Questions.length;
    const maxQuestions = 20;

    if (
      currentIndex + 1 >= maxQuestions &&
      player1Questions.length >= maxQuestions &&
      player2Questions.length >= maxQuestions
    ) {
      if (!tieBreakerMode && score1 === score2) {
        const available = getUnusedQuestions(
          allQuizData.filter(
            (q) => q.ageGroup === category1 || q.ageGroup === category2
          ),
          usedQuestions
        );
        const tieQuestions = shuffleQuestions(available).slice(0, 5);
        setPlayer1Questions((prev) => [...prev, ...tieQuestions]);
        setPlayer2Questions((prev) => [...prev, ...tieQuestions]);
        tieQuestions.forEach((q) => usedQuestions.add(q.question));
        setTieBreakerMode(true);
      } else {
        setShowScore(true);
        return;
      }
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    if (currentPlayer === 2) {
      setCurrentIndex((prev) => prev + 1);
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimer(60);
    setTimerStarted(false);
    setAnswerFeedback("");
  };

  const handleSubmitPlayers = (e) => {
    e.preventDefault();
    if (player1 && player2 && category1 && category2) {
      const allFiltered = shuffleQuestions(
        allQuizData.filter(
          (q) => q.ageGroup === category1 || q.ageGroup === category2
        )
      );
      const uniqueQuestions = Array.from(
        new Set(allFiltered.map((q) => q.question))
      ).map((question) => allFiltered.find((q) => q.question === question));

      const p1Q = uniqueQuestions.slice(0, 20);
      const p2Q = uniqueQuestions.slice(20, 40);

      setPlayer1Questions(p1Q);
      setPlayer2Questions(p2Q);

      const usedSet = new Set([...p1Q, ...p2Q].map((q) => q.question));
      setUsedQuestions(usedSet);
      setSubmitted(true);
    }
  };

  const restartQuiz = () => {
    setPlayer1("");
    setPlayer2("");
    setCategory1("");
    setCategory2("");
    setSubmitted(false);
    setPlayer1Questions([]);
    setPlayer2Questions([]);
    setCurrentIndex(0);
    setCurrentPlayer(1);
    setScore1(0);
    setScore2(0);
    setSelectedAnswer(null);
    setShowScore(false);
    setShowAnswer(false);
    setTimer(60);
    setTimerStarted(false);
    setAnswerFeedback("");
    setTieBreakerMode(false);
    setUsedQuestions(new Set());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 via-black to-blue-800 text-white px-4 relative">
      <div className="w-full max-w-2xl">
        {submitted ? (
          showScore ? (
            <div className="bg-gray-900 rounded-2xl p-6 text-center shadow-xl space-y-3">
              <h2 className="text-3xl font-bold text-orange-400">Final Score</h2>
              <p>{player1}: {score1}</p>
              <p>{player2}: {score2}</p>
              <h3 className="text-xl font-semibold text-blue-300">
                {score1 === score2 ? "It's a Tie!" : score1 > score2 ? `${player1} Wins!` : `${player2} Wins!`}
              </h3>
              <button onClick={restartQuiz} className="mt-4 py-2 px-6 bg-orange-500 rounded-full hover:bg-orange-600">
                Play Again
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-2xl p-6 shadow-xl relative">
              {!timerStarted && !showAnswer && (
                <button onClick={() => setTimerStarted(true)} className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black w-20 h-20 rounded-full border-4 border-orange-500 flex items-center justify-center text-lg font-bold text-orange-400 shadow-lg">
                  Start
                </button>
              )}
              {timerStarted && (
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black w-20 h-20 rounded-full border-4 border-orange-500 flex items-center justify-center text-lg font-bold text-orange-400 shadow-lg">
                  {timer}
                </div>
              )}
              <AnimatePresence>
                {showAnswer && answerFeedback && (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold ${
                      answerFeedback.includes("Correct") ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {answerFeedback}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-between text-2xl font-bold mb-3 text-blue-300">
                <p>🎖 {player1}: {score1}</p>
                <p>🎖 {player2}: {score2}</p>
              </div>
              <h3 className="text-center text-sm text-blue-400 mb-2">
                Question {currentIndex + 1}
              </h3>
              <p className="text-center text-lg text-white font-semibold mb-1">
                🎯 {currentPlayer === 1 ? player1 : player2}'s Turn
              </p>
              <p className="text-3xl text-center font-bold text-white mb-6">
                {getCurrentQuestion()?.question}
              </p>
              <div className="space-y-3">
                {getCurrentQuestion()?.options.map((option, index) => {
                  const correct = option === getCurrentQuestion().answer;
                  const selected = selectedAnswer === option;
                  let optionClass = "w-full py-3 px-4 rounded-lg text-left font-medium bg-gray-800 border transition-all";
                  if (showAnswer) {
                    optionClass += correct
                      ? " border-green-500 bg-green-700 text-white"
                      : selected
                      ? " border-red-500 bg-red-700 text-white"
                      : " border-gray-700 text-white";
                  } else if (selected) {
                    optionClass += " border-blue-500 bg-blue-700";
                  } else {
                    optionClass += " border-gray-700 hover:bg-gray-700";
                  }
                  const motionProps = showAnswer
                    ? {
                        animate: correct
                          ? { scale: [1, 1.1, 1] }
                          : selected
                          ? { x: [-5, 5, -5, 0] }
                          : {},
                        transition: { duration: 0.4 },
                      }
                    : {};
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      className={optionClass}
                      disabled={showAnswer}
                      {...motionProps}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
              {selectedAnswer && !showAnswer && selectedAnswer !== "Time's Up" && (
                <button onClick={handleShowAnswer} className="mt-6 w-full py-3 bg-yellow-500 rounded-full font-bold hover:bg-yellow-600">
                  Show Answer
                </button>
              )}
              {showAnswer && (
                <button onClick={handleNext} className="mt-6 w-full py-3 bg-orange-500 rounded-full font-bold hover:bg-orange-600">
                  Next
                </button>
              )}
            </div>
          )
        ) : (
          <form
            onSubmit={handleSubmitPlayers}
            className="bg-gray-900 rounded-2xl p-6 shadow-xl space-y-4"
          >
            <h2 className="text-center text-4xl font-bold text-white">
              Enter Participants' Info
            </h2>
            <input
              type="text"
              placeholder="Player 1 Zone"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-blue-600 placeholder-gray-400 text-white"
              required
            />
            <select
              value={category1}
              onChange={(e) => setCategory1(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-800 border border-blue-600 text-white"
            >
              <option value="">Player 1 Age Group</option>
              <option value="under10">Under 10</option>
              <option value="under15">Under 15</option>
              <option value="under20">Under 20</option>
            </select>
            <input
              type="text"
              placeholder="Player 2 Zone"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-blue-600 placeholder-gray-400 text-white"
              required
            />
            <select
              value={category2}
              onChange={(e) => setCategory2(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-800 border border-blue-600 text-white"
            >
              <option value="">Player 2 Age Group</option>
              <option value="under10">Under 10</option>
              <option value="under15">Under 15</option>
              <option value="under20">Under 20</option>
            </select>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 rounded-full font-bold hover:bg-orange-600 transition"
            >
              Start Quiz
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
