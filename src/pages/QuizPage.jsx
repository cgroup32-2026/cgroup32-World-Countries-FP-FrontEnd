import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { quizzes } from "../data/quizzes";
import { quizQuestions } from "../data/quizQuestions";
import { mockSubmitQuiz } from "../data/mockQuizSubmit";

export function QuizPage() {
  const { id } = useParams();
  const quiz = useMemo(
    () => quizzes.find((q) => q.quizId === Number(id)),
    [id],
  );
  const questions = useMemo(() => quizQuestions[id] || [], [id]);

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]); // collected as the player progresses — never graded until submit
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState(null); // only populated once "submitted"

  useEffect(() => {
    if (quiz?.timeLimitSeconds) setTimeLeft(quiz.timeLimitSeconds);
  }, [quiz]);

  function handleStartQuiz() {
    setTimeLeft(quiz.timeLimitSeconds);
    setStarted(true);
  }

  function restartQuiz() {
    setStarted(false);
    setResult(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(quiz?.timeLimitSeconds ?? 0);
  }

  // Submits whatever answers were confirmed so far — same function whether
  // the player finishes normally or time runs out.
  function submitQuiz(finalAnswers, timeTakenSeconds) {
    // Later: const submitted = await quizzesApi.submit(quiz.quizId, { answers: finalAnswers, timeTakenSeconds });
    const submitted = mockSubmitQuiz(finalAnswers, timeTakenSeconds);
    setResult(submitted);
  }

  useEffect(() => {
    if (!started || result || !quiz) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          submitQuiz(answers, quiz.timeLimitSeconds);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, result, quiz]);

  if (!quiz) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-amber-50">
        Quiz not found.
      </main>
    );
  }

  if (!started) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-navy-950 flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-lg border border-navy-700 bg-navy-900 p-10 text-center">
          <h1 className="font-heading text-4xl text-amber-400">{quiz.title}</h1>
          {quiz.description && (
            <p className="mt-3 text-amber-50/60">{quiz.description}</p>
          )}

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-amber-50/50">Questions</p>
              <p className="mt-1 text-3xl font-bold text-amber-400">
                {quiz.questionCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-amber-50/50">Time Limit</p>
              <p className="mt-1 text-3xl font-bold text-amber-400">
                {Math.ceil(quiz.timeLimitSeconds / 60)} min
              </p>
            </div>
          </div>

          <p className="mt-10 text-amber-50/70">
            Once you answer a question you can't return to it.
          </p>

          <button
            onClick={handleStartQuiz}
            className="mt-8 rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 hover:bg-amber-400"
          >
            Start Quiz
          </button>
        </div>
      </main>
    );
  }

  if (result) {
    const percentage = result.totalQuestions
      ? Math.round((result.score / result.totalQuestions) * 100)
      : 0;
    let message = "Better luck next time!";
    if (percentage >= 90) message = "Outstanding!";
    else if (percentage >= 75) message = "Great job!";
    else if (percentage >= 50) message = "Nice effort!";

    const minutes = Math.floor(result.timeTakenSeconds / 60);
    const seconds = result.timeTakenSeconds % 60;

    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-navy-950 px-6">
        <div className="w-full max-w-xl rounded-lg border border-navy-700 bg-navy-900 p-10 text-center">
          <div className="text-6xl">🎉</div>
          <h1 className="mt-4 font-heading text-4xl text-amber-400">
            Quiz Complete
          </h1>
          <p className="mt-2 text-amber-50/70">{quiz.title}</p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-amber-50/50">Score</p>
              <p className="mt-2 text-3xl font-bold text-amber-400">
                {result.score}/{result.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-sm text-amber-50/50">Accuracy</p>
              <p className="mt-2 text-3xl font-bold text-amber-400">
                {percentage}%
              </p>
            </div>
            <div>
              <p className="text-sm text-amber-50/50">Time</p>
              <p className="mt-2 text-3xl font-bold text-amber-400">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </p>
            </div>
          </div>

          <p className="mt-10 text-xl text-amber-50">{message}</p>

          {/* Per-question review — this comes free from matching the real API's response shape */}
          <div className="mt-8 space-y-2 text-left">
            {result.results.map((r, i) => (
              <div
                key={r.questionId}
                className={`rounded px-4 py-2 text-sm ${r.wasCorrect ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}
              >
                Question {i + 1}:{" "}
                {r.wasCorrect
                  ? "Correct"
                  : `Incorrect (answer was ${r.correctOption})`}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={restartQuiz}
              className="rounded bg-amber-500 px-6 py-3 font-semibold text-navy-950 hover:bg-amber-400"
            >
              Play Again
            </button>
            <Link
              to="/quizzes"
              className="rounded border border-amber-500 px-6 py-3 text-amber-400 hover:bg-amber-500 hover:text-navy-950"
            >
              Back to Quizzes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentIndex];
  const progress = questions.length
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  function nextQuestion() {
    const updatedAnswers = [
      ...answers,
      { questionId: question.questionId, selectedOption: selectedAnswer },
    ];
    setAnswers(updatedAnswers);

    if (currentIndex === questions.length - 1) {
      submitQuiz(updatedAnswers, quiz.timeLimitSeconds - timeLeft);
      return;
    }

    setCurrentIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-3xl text-amber-400">{quiz.title}</h1>
          <div
            className={`rounded px-5 py-2 font-bold ${timeLeft <= 30 ? "bg-red-900 text-red-300" : timeLeft <= 60 ? "bg-yellow-900 text-yellow-300" : "bg-navy-900 text-amber-400"}`}
          >
            {`${Math.floor(timeLeft / 60)
              .toString()
              .padStart(
                2,
                "0",
              )}:${(timeLeft % 60).toString().padStart(2, "0")}`}
          </div>
        </div>

        <div className="mb-3 flex justify-between text-sm text-amber-50/60">
          <span>
            Question {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="mb-8 h-3 overflow-hidden rounded-full bg-navy-800">
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="rounded-lg border border-navy-700 bg-navy-900 p-8">
          <h2 className="text-2xl font-semibold">
            {question?.questionText ?? "No question available."}
          </h2>

          <div className="mt-8 space-y-4">
            {[
              ["A", question?.optionA],
              ["B", question?.optionB],
              ["C", question?.optionC],
              ["D", question?.optionD],
            ].map(([letter, option]) => (
              <button
                key={letter}
                onClick={() => setSelectedAnswer(letter)}
                className={`w-full rounded-lg border p-4 text-left transition ${selectedAnswer === letter ? "border-amber-400 bg-amber-500/20 ring-2 ring-amber-400" : "border-navy-700 bg-navy-800 hover:border-amber-500"}`}
              >
                <span className="font-bold">{letter}.</span> {option}
              </button>
            ))}
          </div>

          <div className="mt-8 text-right">
            <button
              disabled={selectedAnswer === null}
              onClick={nextQuestion}
              className="rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
