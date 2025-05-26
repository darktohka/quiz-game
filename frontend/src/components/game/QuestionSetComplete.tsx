import { QuizDTO } from 'shared/src/dto/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/game/ui/card';
import { Button } from '@/components/game/ui/button';
import { Badge } from '@/components/game/ui/badge';
import { Trophy, Star, ArrowRight, CheckCircle } from 'lucide-preact';
import PuzzleProgress from './PuzzleProgress';
import { hu } from '@/locales/hu';
import { Footer } from './Footer';

interface QuestionSetCompleteProps {
  quiz: QuizDTO;
  currentQuestionSetIndex: number;
  totalPoints: number;
  questionSetPoints: number;
  puzzlePieces: number;
  onNextQuestionSet: () => void;
}

const QuestionSetComplete = ({
  quiz,
  currentQuestionSetIndex,
  totalPoints,
  questionSetPoints,
  puzzlePieces,
  onNextQuestionSet,
}: QuestionSetCompleteProps) => {
  const currentQuestionSet = quiz.questionSets[currentQuestionSetIndex];
  const isLastQuestionSet =
    currentQuestionSetIndex >= quiz.questionSets.length - 1;
  const nextQuestionSet = !isLastQuestionSet
    ? quiz.questionSets[currentQuestionSetIndex + 1]
    : null;
  const totalRequiredPoints = quiz.questionSets
    .slice(0, currentQuestionSetIndex + 1)
    .reduce((sum, set) => sum + set.minimumPoints, 0);
  const nextRequiredPoints =
    totalRequiredPoints + nextQuestionSet?.minimumPoints;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {hu.questionSetComplete}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {hu.successfullyCompleted.replace(
              ':title',
              currentQuestionSet.title,
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Results Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                {hu.resultsSummary}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{hu.pointsEarned}</span>
                <Badge variant="default" className="text-lg px-3 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  {questionSetPoints}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">{hu.requiredPoints}</span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {totalRequiredPoints}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">{hu.totalPoints}</span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {totalPoints}
                </Badge>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">
                    {hu.puzzlePieceUnlocked}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <PuzzleProgress
            totalPieces={quiz.questionSets.length}
            completedPieces={puzzlePieces}
            puzzleImage={quiz.imageUrl}
            isComplete={false}
          />
        </div>

        {/* Next Section Preview */}
        {nextQuestionSet && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {hu.next} {nextQuestionSet.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {nextQuestionSet.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>
                  {nextQuestionSet.questionsToChoose} {hu.question}
                </span>
                <span>•</span>
                <span>
                  {nextRequiredPoints} {hu.points} {hu.required}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <Button onClick={onNextQuestionSet} size="lg" className="px-8">
            {isLastQuestionSet ? hu.completeQuiz : hu.continueToNextSet}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionSetComplete;
