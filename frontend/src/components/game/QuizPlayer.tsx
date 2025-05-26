import { useState } from 'preact/hooks';
import { QuizDTO, QuestionDTO } from 'shared/src/dto/quiz';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/game/ui/card';
import { Button } from '@/components/game/ui/button';
import { Progress } from '@/components/game/ui/progress';
import { Badge } from '@/components/game/ui/badge';
import { CheckCircle, XCircle, Star, ArrowRight } from 'lucide-preact';
import { useToast } from '@/hooks/use-toast';
import { hu } from '@/locales/hu';
import { Footer } from './Footer';

interface QuizPlayerProps {
  quiz: QuizDTO;
  currentQuestionSetIndex: number;
  currentQuestionIndex: number;
  selectedQuestions: QuestionDTO[];
  totalPoints: number;
  onAnswerQuestion: (_points: number) => void;
}

const QuizPlayer = ({
  quiz,
  currentQuestionSetIndex,
  currentQuestionIndex,
  selectedQuestions,
  totalPoints,
  onAnswerQuestion,
}: QuizPlayerProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const currentQuestionSet = quiz.questionSets[currentQuestionSetIndex];
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

  // Calculate total required points up to this question set
  const totalRequiredPoints = quiz.questionSets
    .slice(0, currentQuestionSetIndex + 1)
    .reduce((sum, set) => sum + set.minimumPoints, 0);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const correctOption = currentQuestion.options.find((opt) => opt.isCorrect);
    const selectedOption = currentQuestion.options.find(
      (opt) => opt.answer === selectedAnswer,
    );
    const correct = selectedOption?.isCorrect || false;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      toast({
        title: hu.correct,
        description: hu.youEarned.replace(
          ':points',
          currentQuestion.points.toString(),
        ),
      });
    } else {
      toast({
        title: hu.incorrect,
        description: hu.correctAnswerWas.replace(
          ':answer',
          correctOption?.answer,
        ),
        variant: 'destructive',
      });
    }
  };

  const handleNextQuestion = () => {
    const pointsEarned = isCorrect ? currentQuestion.points : 0;
    onAnswerQuestion(pointsEarned);

    // Reset state for next question
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                {totalPoints} {hu.points}
              </Badge>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">
                {currentQuestionSet.title}
              </h2>
              <span className="text-sm text-gray-500">
                {hu.quizOf
                  .replace(':current', (currentQuestionIndex + 1).toString())
                  .replace(':total', selectedQuestions.length.toString())}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-2 text-sm text-gray-600">
              {hu.questionSetPoints
                .replace(':points', totalPoints.toString())
                .replace(':required', totalRequiredPoints.toString())}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
            {currentQuestion.imageUrl && (
              <div className="flex justify-center my-4">
                <img
                  src={currentQuestion.imageUrl}
                  alt={'Kérdés képe'}
                  className="max-h-56 rounded shadow"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {currentQuestion.points} {hu.points}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonVariant:
                | 'default'
                | 'outline'
                | 'destructive'
                | 'secondary' = 'outline';
              let icon = null;

              if (showResult) {
                if (option.isCorrect) {
                  buttonVariant = 'default';
                  icon = <CheckCircle className="w-5 h-5" />;
                } else if (
                  option.answer === selectedAnswer &&
                  !option.isCorrect
                ) {
                  buttonVariant = 'destructive';
                  icon = <XCircle className="w-5 h-5" />;
                }
              } else if (option.answer === selectedAnswer) {
                buttonVariant = 'secondary';
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  className="w-full justify-start text-left h-auto p-4 transition-all duration-200"
                  onClick={() => handleAnswerSelect(option.answer)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    {icon}
                    <span className="text-sm font-medium">
                      {String.fromCharCode(65 + index)}. {option.answer}
                    </span>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          {!showResult ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              size="lg"
              className="px-8"
            >
              {hu.submitAnswer}
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} size="lg" className="px-8">
              {currentQuestionIndex >= selectedQuestions.length - 1
                ? hu.completeSet
                : hu.nextQuestion}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizPlayer;
