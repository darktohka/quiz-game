import { FormInput } from '@/components/form/FormInput';
import { FormLabel } from '@/components/form/FormLabel';
import { ListFormRemoveButton } from '@/components/form/ListFormRemoveButton';
import { QuestionSetDTO } from 'shared/src/dto/quiz';
import { QuestionsForm } from './QuestionsForm';

export type QuestionSetFormProps = {
  set: QuestionSetDTO;
  setSet: (_link: QuestionSetDTO) => void;
  removeSet: () => void;
};

export const QuestionSetForm = ({
  set,
  setSet,
  removeSet,
}: QuestionSetFormProps) => (
  <div className="flex flex-col gap-2 mx-[3rem]">
    <FormInput>
      <FormLabel label="Kérdéssor címe" />
      <div className="flex flex-row gap-3">
        <input
          type="text"
          placeholder="Cím"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={set.title}
          onChange={(e) => setSet({ ...set, title: e.currentTarget.value })}
        />
        <ListFormRemoveButton onClick={removeSet} />
      </div>
    </FormInput>
    <FormInput>
      <FormLabel label="Kérdéssor leírása" />
      <input
        type="text"
        placeholder="Leírás"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        value={set.description}
        onChange={(e) => setSet({ ...set, description: e.currentTarget.value })}
      />
    </FormInput>
    <div className="flex flex-row gap-3">
      <FormInput>
        <FormLabel label="Minimum pontszám a kérdéssorozat kezdéshez" />
        <input
          type="number"
          placeholder="Minimum pontszám a kérdéssorozat kezdéshez"
          min={0}
          className="w-32 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={set.minimumPoints}
          onChange={(e) =>
            setSet({ ...set, minimumPoints: Number(e.currentTarget.value) })
          }
        />
      </FormInput>
      <FormInput>
        <FormLabel label="Véletlenszerűen választott kérdések száma" />
        <input
          type="number"
          min={1}
          className="w-40 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={set.questionsToChoose}
          onChange={(e) =>
            setSet({ ...set, questionsToChoose: Number(e.currentTarget.value) })
          }
        />
      </FormInput>
    </div>

    <QuestionsForm
      questions={set.questions}
      setQuestions={(questions) => setSet({ ...set, questions })}
    />
    <hr />
  </div>
);
