// This mirrors data that would ONLY ever exist server-side in the real app —
// never import this into anything the player actually sees during a quiz.
// It exists purely so mockSubmitQuiz() can grade answers, the same way your
// real backend grades them only at submission time.
export const quizAnswerKey = {
  1: "A",
  2: "B",
  3: "A",
};