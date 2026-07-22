import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

export function QuizAttemptCard({ attempt }) {
  const completedDate = new Date(attempt.CompletedAt).toLocaleDateString();

  const minutes = Math.floor(attempt.TimeTakenSeconds / 60);

  const seconds = attempt.TimeTakenSeconds % 60;

  const formattedTime = `${minutes}m ${seconds.toString().padStart(2, "0")}s`;

  return (
    <Card className="transition hover:border-amber-500">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-amber-50">
            {attempt.QuizTitle}
          </h2>

          <p className="mt-2 text-sm text-amber-50/50">
            Completed on {completedDate}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-center sm:flex">
          <div>
            <p className="text-2xl font-bold text-amber-400">{attempt.Score}</p>

            <p className="text-xs text-amber-50/50">Score</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-amber-400">{formattedTime}</p>

            <p className="text-xs text-amber-50/50">Time</p>
          </div>
        </div>

        <Link
          to={`/quizzes/${attempt.QuizId}`}
          className="text-sm font-semibold text-amber-400 transition hover:text-amber-300"
        >
          Play Again →
        </Link>
      </div>
    </Card>
  );
}
