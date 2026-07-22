import { Link } from "react-router-dom";

export function QuizCard({ quiz }) {
  const minutes = Math.ceil(quiz.timeLimitSeconds / 60);

  return (
    <div className="rounded-lg border border-navy-700 bg-navy-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-amber-500">
      <h2 className="text-2xl font-heading text-amber-50">{quiz.title}</h2>
      {quiz.description && (
        <p className="mt-2 text-sm text-amber-50/60">{quiz.description}</p>
      )}

      <div className="mt-6 flex justify-between border-y border-navy-700 py-4 text-sm">
        <div className="text-center">
          <p className="text-amber-50/50">Questions</p>
          <p className="mt-1 text-lg font-semibold text-amber-400">
            {quiz.questionCount}
          </p>
        </div>
        <div className="text-center">
          <p className="text-amber-50/50">Time Limit</p>
          <p className="mt-1 text-lg font-semibold text-amber-400">
            {minutes} min
          </p>
        </div>
      </div>

      <Link
        to={`/quizzes/${quiz.quizId}`}
        className="mt-6 block rounded bg-amber-500 py-3 text-center font-semibold text-navy-950 transition hover:bg-amber-400"
      >
        Start Quiz
      </Link>
    </div>
  );
}
