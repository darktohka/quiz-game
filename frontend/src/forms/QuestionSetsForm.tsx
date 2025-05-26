import { ListForm } from '@/components/form/ListForm';
import { QuestionSetDTO } from 'shared/src/dto/quiz';
import { QuestionSetForm } from './QuestionSetForm';

export type QuestionSetsFormProps = {
  sets: QuestionSetDTO[];
  setSets: (_links: QuestionSetDTO[]) => void;
};

export const QuestionSetsForm = ({ sets, setSets }: QuestionSetsFormProps) => {
  return (
    <ListForm
      items={sets}
      setItems={setSets}
      renderItem={(set, setSet, removeSet) => (
        <QuestionSetForm set={set} setSet={setSet} removeSet={removeSet} />
      )}
      canCreateNewItem={true}
      createNewItem={() => ({
        title: '',
        description: '',
        minimumPoints: 0,
        questionsToChoose: 1,
        questions: [],
      })}
      label="Kérdéssorozatok"
    />
  );
};
