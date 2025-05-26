import { BallTriangle } from 'react-loading-icons';
import { useQuiz } from '@/services/quiz.service';
import { NewQuizForm } from './NewQuizForm';

export type EditQuizFormProps = {
  id: string;
};

export const EditQuizForm = ({ id }: EditQuizFormProps) => {
  const { data: quiz, isLoading } = useQuiz(id);

  if (isLoading) {
    return <BallTriangle stroke="currentColor" />;
  }

  if (!quiz) {
    return null;
  }

  return <NewQuizForm quiz={quiz} />;
};
