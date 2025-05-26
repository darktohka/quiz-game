import { QuizDTO } from 'shared/src/dto/quiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/game/ui/card';
import { Button } from '@/components/game/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-preact';
import { hu } from '@/locales/hu';
import { Footer } from './Footer';

interface RetryPromptProps {
  quiz: QuizDTO;
  currentQuestionSetIndex: number;
  questionSetPoints: number;
  totalPoints: number;
  onRetry: () => void;
  onQuitToMenu: () => void;
}

const RetryPrompt = ({
  quiz,
  currentQuestionSetIndex,
  questionSetPoints,
  totalPoints,
  onRetry,
  onQuitToMenu,
}: RetryPromptProps) => {
  const currentQuestionSet = quiz.questionSets[currentQuestionSetIndex];

  // Calculate total required points up to this question set
  const totalRequiredPoints = quiz.questionSets
    .slice(0, currentQuestionSetIndex + 1)
    .reduce((sum, set) => sum + set.minimumPoints, 0);

  const pointsNeeded = totalRequiredPoints - totalPoints;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {hu.notQuiteThereYet}
          </h1>

          <p className="text-xl text-gray-600 mb-6">{hu.needMorePoints}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">
              {currentQuestionSet.title} - {hu.results}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {totalPoints}
                  </div>
                  <div className="text-sm text-gray-500">
                    {hu.totalEarnedPoints}
                  </div>
                </div>
                <div className="text-2xl text-gray-400">/</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {totalRequiredPoints}
                  </div>
                  <div className="text-sm text-gray-500">
                    {hu.totalRequiredPoints}
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800">
                  {hu.youNeed}{' '}
                  <strong>
                    {pointsNeeded} {hu.morePoints}
                  </strong>{' '}
                  {hu.totalToContinue}
                </p>
              </div>

              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <div className="mb-2">
                  {hu.thisAttempt.replace(
                    ':points',
                    questionSetPoints.toString(),
                  )}
                </div>
                <div>
                  {hu.requiredFor.replace(
                    ':points',
                    currentQuestionSet.minimumPoints.toString(),
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={onRetry} size="lg" className="w-full">
                <RotateCcw className="w-5 h-5 mr-2" />
                {hu.retryQuestionSet}
              </Button>

              <Button
                onClick={onQuitToMenu}
                variant="outline"
                size="lg"
                className="w-full"
              >
                {hu.returnToQuizSelection}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              {hu.dontWorry} {hu.totalPointsKept}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default RetryPrompt;
