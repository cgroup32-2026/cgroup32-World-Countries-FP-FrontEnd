import { QuizAttemptCard } from "../components/quizzes/QuizAttemptCard";
import { Card } from "../components/ui/Card";
import { myQuizAttempts } from "../data/quizHistory";

export function MyQuizHistoryPage() {
  const attempts = myQuizAttempts;

  const totalAttempts = attempts.length;

  const averageScore =
    totalAttempts > 0
      ? (
          attempts.reduce((total, attempt) => total + attempt.Score, 0) /
          totalAttempts
        ).toFixed(1)
      : 0;

  const bestScore =
    totalAttempts > 0
      ? Math.max(...attempts.map((attempt) => attempt.Score))
      : 0;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="font-heading text-5xl text-amber-400">
            My Quiz History
          </h1>

          <p className="mt-3 text-amber-50/70">
            Review your previous quiz attempts and track your geography
            progress.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <HistoryStat label="Quizzes Taken" value={totalAttempts} />

          <HistoryStat label="Average Score" value={averageScore} />

          <HistoryStat label="Best Score" value={bestScore} />
        </section>

        {attempts.length === 0 ? (
          <Card className="py-16 text-center">
            <p className="text-lg text-amber-50/60">
              You haven't completed any quizzes yet.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt) => (
              <QuizAttemptCard key={attempt.AttemptId} attempt={attempt} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function HistoryStat({ label, value }) {
  return (
    <Card className="text-center">
      <p className="text-3xl font-bold text-amber-400">{value}</p>

      <p className="mt-2 text-sm text-amber-50/60">{label}</p>
    </Card>
  );
}
