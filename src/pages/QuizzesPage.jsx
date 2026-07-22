import { quizzes } from "../data/quizzes";
import { QuizCard } from "../components/quizzes/QuizCard";

export function QuizzesPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-heading text-5xl text-amber-400">
            Geography Quizzes
          </h1>

          <p className="mt-3 max-w-2xl text-amber-50/70">
            Test your knowledge of countries, capitals, flags, and geography
            from around the world.
          </p>
        </header>

        {quizzes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-navy-700 py-16 text-center">
            <p className="text-lg text-amber-50/60">
              No quizzes are available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {quizzes.map((quiz, index) => (
              <QuizCard key={quiz.quizId ?? quiz.QuizId ?? index} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
