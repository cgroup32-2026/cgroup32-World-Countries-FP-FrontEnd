import { quizAnswerKey } from "./quizAnswerKey";

export function mockSubmitQuiz(answers, timeTakenSeconds) {
  const results = answers.map((a) => ({
    questionId: a.questionId,
    wasCorrect: quizAnswerKey[a.questionId] === a.selectedOption,
    correctOption: quizAnswerKey[a.questionId],
  }));

  const score = results.filter((r) => r.wasCorrect).length;

  return { score, totalQuestions: answers.length, timeTakenSeconds, results };
}