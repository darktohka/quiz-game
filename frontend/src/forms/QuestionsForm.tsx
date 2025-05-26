import { ListForm } from '@/components/form/ListForm';
import { QuestionDTO } from 'shared/src/dto/quiz';
import { QuestionForm } from './QuestionForm';

export type QuestionsFormProps = {
  questions: QuestionDTO[];
  setQuestions: (_questions: QuestionDTO[]) => void;
};

export const QuestionsForm = ({
  questions,
  setQuestions,
}: QuestionsFormProps) => {
  return (
    <ListForm
      items={questions}
      setItems={setQuestions}
      renderItem={(question, setQuestion, removeQuestion) => (
        <QuestionForm
          question={question}
          setQuestion={setQuestion}
          removeQuestion={removeQuestion}
        />
      )}
      canCreateNewItem={true}
      createNewItem={() => ({
        question: '',
        points: 1,
        imageUrl: null,
        options: [],
      })}
      label="Kérdések"
    />
  );
};
