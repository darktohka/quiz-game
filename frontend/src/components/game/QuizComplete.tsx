import { QuizDTO } from 'shared/src/dto/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/game/ui/card';
import { Button } from '@/components/game/ui/button';
import { Badge } from '@/components/game/ui/badge';
import { Trophy, Star, Home, RotateCcw } from 'lucide-preact';
import PuzzleProgress, {
  getVisiblePieces,
  QUIZ_PIECES,
} from './PuzzleProgress';
import { hu } from '@/locales/hu';
import { Footer } from './Footer';

interface QuizCompleteProps {
  quiz: QuizDTO;
  totalPoints: number;
  completePercentage: number;
  puzzlePieces: number;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
}

const QuizComplete = ({
  quiz,
  totalPoints,
  completePercentage,
  puzzlePieces,
  onPlayAgain,
  onReturnToMenu,
}: QuizCompleteProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {hu.congratulations}
          </h1>

          <p className="text-2xl text-gray-600 mb-6">
            {hu.completedQuiz.replace(':title', quiz.title)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Achievement Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                {hu.finalResults}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {totalPoints}
                </div>
                <div className="text-lg text-gray-600">
                  {hu.totalPointsEarned}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {hu.questionSetsCompleted}
                  </span>
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {quiz.questionSets.length}/{quiz.questionSets.length}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {hu.puzzlePiecesCollected}
                  </span>
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {getVisiblePieces(puzzlePieces, quiz.questionSets.length)}/
                    {QUIZ_PIECES}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{hu.quizMastery}</span>
                  <Badge
                    variant="default"
                    className="text-lg px-3 py-1 bg-green-500"
                  >
                    {completePercentage.toFixed(0)}% {hu.complete}
                  </Badge>
                </div>
              </div>
              {completePercentage >= 100 && (
                <div className="pt-4 border-t text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 text-lg font-semibold">
                    <Star className="w-6 h-6" />
                    {hu.masterAchievementUnlocked}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Puzzle */}
          <PuzzleProgress
            totalPieces={quiz.questionSets.length}
            completedPieces={puzzlePieces}
            puzzleImage={quiz.imageUrl}
            isComplete={true}
          />
        </div>

        {/* Quiz Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {hu.quizSummary.replace(':title', quiz.title)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quiz.questionSets.map((set, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-semibold text-green-800">
                      {set.title}
                    </span>
                  </div>
                  <p className="text-sm text-green-700">{set.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onPlayAgain} size="lg" className="px-8">
            <RotateCcw className="w-5 h-5 mr-2" />
            {hu.playAgain}
          </Button>

          <Button
            onClick={onReturnToMenu}
            variant="outline"
            size="lg"
            className="px-8"
          >
            <Home className="w-5 h-5 mr-2" />
            {hu.chooseNewQuiz}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizComplete;
