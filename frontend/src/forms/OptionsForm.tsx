import { ListForm } from '@/components/form/ListForm';
import { QuestionOptionDTO } from 'shared/src/dto/quiz';
import { OptionForm } from './OptionForm';

export type OptionsFormProps = {
  options: QuestionOptionDTO[];
  setOptions: (_options: QuestionOptionDTO[]) => void;
};

export const OptionsForm = ({ options, setOptions }: OptionsFormProps) => {
  return (
    <ListForm
      items={options}
      setItems={setOptions}
      renderItem={(option, setOption, removeOption) => (
        <OptionForm
          option={option}
          setOption={setOption}
          removeOption={removeOption}
        />
      )}
      canCreateNewItem={true}
      createNewItem={() => ({
        answer: '',
        isCorrect: false,
      })}
      label="Válaszok"
    />
  );
};
