import { QuizDTO } from 'shared/src/dto/quiz';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/game/ui/card';
import { Button } from '@/components/game/ui/button';
import { Badge } from '@/components/game/ui/badge';
import { Play, Trophy, HelpCircle } from 'lucide-preact';
import { hu } from '@/locales/hu';
import { Footer } from './Footer';

interface QuizSelectionProps {
  quizzes: QuizDTO[];
  onSelectQuiz: (_quiz: QuizDTO) => void;
}

const QuizSelection = ({ quizzes, onSelectQuiz }: QuizSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {hu.quizPuzzleAdventure}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {hu.quizPuzzleDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => onSelectQuiz(quiz)}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {quiz.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {quiz.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {quiz.questionSets.length} {hu.questionSet}
                    </span>
                  </div>
                  <Badge variant="secondary">
                    {quiz.questionSets.reduce(
                      (total, set) => total + set.questionsToChoose,
                      0
                    )}{' '}
                    {hu.question}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {quiz.questionSets.map((set, index) => (
                    <div
                      key={index}
                      className="text-xs text-gray-500 bg-gray-50 p-2 rounded"
                    >
                      <strong>{set.title}</strong> - {set.questionsToChoose}{' '}
                      {hu.question}, {set.minimumPoints} {hu.minPoints}
                    </div>
                  ))}
                </div>

                <Button className="w-full group-hover:bg-blue-600 transition-colors">
                  <Play className="w-4 h-4 mr-2" />
                  {hu.startQuiz}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizSelection;
