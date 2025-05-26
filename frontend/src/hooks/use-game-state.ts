import { QuizDTO, QuestionDTO } from 'shared/src/dto/quiz';
import { useCallback, useState } from 'preact/hooks';

export interface GameState {
  selectedQuiz: QuizDTO | null;
  currentQuestionSetIndex: number;
  currentQuestionIndex: number;
  totalPoints: number;
  questionSetPoints: number;
  totalQuestions: number;
  correctQuestionSetQuestions: number;
  correctQuestions: number;
  selectedQuestions: QuestionDTO[];
  completedQuestionSets: number[];
  puzzlePieces: number;
  isQuizComplete: boolean;
  gamePhase:
    | 'quiz-selection'
    | 'playing'
    | 'question-set-complete'
    | 'quiz-complete'
    | 'retry-prompt';
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    selectedQuiz: null,
    currentQuestionSetIndex: 0,
    currentQuestionIndex: 0,
    totalPoints: 0,
    questionSetPoints: 0,
    totalQuestions: 0,
    correctQuestionSetQuestions: 0,
    correctQuestions: 0,
    selectedQuestions: [],
    completedQuestionSets: [],
    puzzlePieces: 0,
    isQuizComplete: false,
    gamePhase: 'quiz-selection',
  });

  console.log('Initial game state:', gameState);

  const selectQuiz = useCallback((quiz: QuizDTO) => {
    const firstQuestionSet = quiz.questionSets[0];
    const shuffledQuestions = [...firstQuestionSet.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, firstQuestionSet.questionsToChoose);

    setGameState({
      selectedQuiz: quiz,
      currentQuestionSetIndex: 0,
      currentQuestionIndex: 0,
      totalPoints: 0,
      questionSetPoints: 0,
      totalQuestions: 0,
      correctQuestionSetQuestions: 0,
      correctQuestions: 0,
      selectedQuestions: shuffledQuestions,
      completedQuestionSets: [],
      puzzlePieces: 0,
      isQuizComplete: false,
      gamePhase: 'playing',
    });
  }, []);

  const answerQuestion = useCallback((points: number) => {
    setGameState((prev) => {
      const newQuestionSetPoints = prev.questionSetPoints + points;
      const newTotalPoints = prev.totalPoints + points;
      const isLastQuestion =
        prev.currentQuestionIndex >= prev.selectedQuestions.length - 1;

      if (isLastQuestion) {
        //const currentQuestionSet =
        //  prev.selectedQuiz!.questionSets[prev.currentQuestionSetIndex];

        // Calculate total required points for this question set based on completed sets
        const totalRequiredPoints = prev
          .selectedQuiz!.questionSets.slice(0, prev.currentQuestionSetIndex + 1)
          .reduce((sum, set) => sum + set.minimumPoints, 0);

        const hasEnoughPoints = newTotalPoints >= totalRequiredPoints;

        if (hasEnoughPoints) {
          const newCompletedSets = [
            ...prev.completedQuestionSets,
            prev.currentQuestionSetIndex,
          ];
          const newPuzzlePieces = prev.puzzlePieces + 1;
          const isQuizComplete =
            newCompletedSets.length === prev.selectedQuiz!.questionSets.length;
          const correctQuestionSetQuestions =
            prev.correctQuestionSetQuestions + (points > 0 ? 1 : 0);
          return {
            ...prev,
            totalPoints: newTotalPoints,
            questionSetPoints: newQuestionSetPoints,
            completedQuestionSets: newCompletedSets,
            totalQuestions: prev.totalQuestions + 1,
            correctQuestionSetQuestions,
            correctQuestions: isQuizComplete
              ? prev.correctQuestions + correctQuestionSetQuestions
              : prev.correctQuestions,
            puzzlePieces: newPuzzlePieces,
            isQuizComplete,
            gamePhase: isQuizComplete
              ? 'quiz-complete'
              : 'question-set-complete',
          };
        } else {
          return {
            ...prev,
            totalPoints: newTotalPoints,
            questionSetPoints: newQuestionSetPoints,
            totalQuestions: prev.totalQuestions + 1,
            gamePhase: 'retry-prompt',
          };
        }
      }

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        totalPoints: newTotalPoints,
        questionSetPoints: newQuestionSetPoints,
        totalQuestions: prev.totalQuestions + 1,
        correctQuestionSetQuestions:
          prev.correctQuestionSetQuestions + (points > 0 ? 1 : 0),
      };
    });
  }, []);

  const nextQuestionSet = useCallback(() => {
    setGameState((prev) => {
      const nextIndex = prev.currentQuestionSetIndex + 1;
      const nextQuestionSet = prev.selectedQuiz!.questionSets[nextIndex];
      const shuffledQuestions = [...nextQuestionSet.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, nextQuestionSet.questionsToChoose);

      return {
        ...prev,
        currentQuestionSetIndex: nextIndex,
        currentQuestionIndex: 0,
        questionSetPoints: 0,
        correctQuestionSetQuestions: 0,
        correctQuestions:
          prev.correctQuestions + prev.correctQuestionSetQuestions,
        selectedQuestions: shuffledQuestions,
        gamePhase: 'playing',
      };
    });
  }, []);

  const retryQuestionSet = useCallback(() => {
    setGameState((prev) => {
      const currentQuestionSet =
        prev.selectedQuiz!.questionSets[prev.currentQuestionSetIndex];
      const shuffledQuestions = [...currentQuestionSet.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, currentQuestionSet.questionsToChoose);

      return {
        ...prev,
        currentQuestionIndex: 0,
        questionSetPoints: 0,
        totalPoints: prev.totalPoints - prev.questionSetPoints,
        totalQuestions:
          prev.totalQuestions - currentQuestionSet.questionsToChoose,
        correctQuestionSetQuestions: 0,
        selectedQuestions: shuffledQuestions,
        gamePhase: 'playing',
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      selectedQuiz: null,
      currentQuestionSetIndex: 0,
      currentQuestionIndex: 0,
      totalPoints: 0,
      questionSetPoints: 0,
      totalQuestions: 0,
      correctQuestionSetQuestions: 0,
      correctQuestions: 0,
      selectedQuestions: [],
      completedQuestionSets: [],
      puzzlePieces: 0,
      isQuizComplete: false,
      gamePhase: 'quiz-selection',
    });
  }, []);

  return {
    gameState,
    selectQuiz,
    answerQuestion,
    nextQuestionSet,
    retryQuestionSet,
    resetGame,
  };
};
