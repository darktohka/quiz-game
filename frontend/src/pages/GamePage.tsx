import { useGameState } from '@/hooks/use-game-state';
import QuizSelection from '@/components/game/QuizSelection';
import QuizPlayer from '@/components/game/QuizPlayer';
import QuestionSetComplete from '@/components/game/QuestionSetComplete';
import RetryPrompt from '@/components/game/RetryPrompt';
import QuizComplete from '@/components/game/QuizComplete';
import { useQuizzes } from '@/services/quiz.service';
import { LoadingScreen } from '@/components/game/LoadingScreen';
import { ErrorScreen } from '@/components/game/ErrorScreen';

export const GamePage = () => {
  const { data: quizzes, isLoading, error } = useQuizzes();
  const {
    gameState,
    selectQuiz,
    answerQuestion,
    nextQuestionSet,
    retryQuestionSet,
    resetGame,
  } = useGameState();

  const renderCurrentPhase = () => {
    switch (gameState.gamePhase) {
      case 'quiz-selection':
        return <QuizSelection quizzes={quizzes} onSelectQuiz={selectQuiz} />;

      case 'playing':
        return (
          <QuizPlayer
            quiz={gameState.selectedQuiz!}
            currentQuestionSetIndex={gameState.currentQuestionSetIndex}
            currentQuestionIndex={gameState.currentQuestionIndex}
            selectedQuestions={gameState.selectedQuestions}
            totalPoints={gameState.totalPoints}
            onAnswerQuestion={answerQuestion}
          />
        );

      case 'question-set-complete':
        return (
          <QuestionSetComplete
            quiz={gameState.selectedQuiz!}
            currentQuestionSetIndex={gameState.currentQuestionSetIndex}
            totalPoints={gameState.totalPoints}
            questionSetPoints={gameState.questionSetPoints}
            puzzlePieces={gameState.puzzlePieces}
            onNextQuestionSet={nextQuestionSet}
          />
        );

      case 'retry-prompt':
        return (
          <RetryPrompt
            quiz={gameState.selectedQuiz!}
            currentQuestionSetIndex={gameState.currentQuestionSetIndex}
            questionSetPoints={gameState.questionSetPoints}
            totalPoints={gameState.totalPoints}
            onRetry={retryQuestionSet}
            onQuitToMenu={resetGame}
          />
        );

      case 'quiz-complete':
        return (
          <QuizComplete
            quiz={gameState.selectedQuiz!}
            totalPoints={gameState.totalPoints}
            puzzlePieces={gameState.puzzlePieces}
            onPlayAgain={() => selectQuiz(gameState.selectedQuiz!)}
            completePercentage={
              (gameState.correctQuestions / gameState.totalQuestions) * 100
            }
            onReturnToMenu={resetGame}
          />
        );

      default:
        return <QuizSelection quizzes={quizzes} onSelectQuiz={selectQuiz} />;
    }
  };

  //if (isLoading) {
  //  return (
  //    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
  //      <div className="max-w-6xl mx-auto">
  //        <div className="text-center mb-12">
  //          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
  //            Loading quizzes...
  //          </p>
  //        </div>
  //      </div>
  //    </div>
  //  );
  //}

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error.toString()} />;
  }

  return renderCurrentPhase();
};
