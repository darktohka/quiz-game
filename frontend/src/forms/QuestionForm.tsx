import { FormInput } from '@/components/form/FormInput';
import { FormLabel } from '@/components/form/FormLabel';
import { ListFormRemoveButton } from '@/components/form/ListFormRemoveButton';
import { QuestionDTO } from 'shared/src/dto/quiz';
import { ImageURLForm } from './ImageURLForm';
import { OptionsForm } from './OptionsForm';

export type QuestionFormProps = {
  question: QuestionDTO;
  setQuestion: (_question: QuestionDTO) => void;
  removeQuestion: () => void;
};

export const QuestionForm = ({
  question,
  setQuestion,
  removeQuestion,
}: QuestionFormProps) => (
  <div className="flex flex-col gap-2 mx-[3rem]">
    <div className="flex flex-row gap-3">
      <div className="w-full">
        <FormLabel label="Kérdés" />
        <input
          type="text"
          placeholder="Cím"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={question.question}
          onChange={(e) =>
            setQuestion({ ...question, question: e.currentTarget.value })
          }
        />
      </div>
      <FormInput>
        <FormLabel label="Kérdésre adott pontszám" />
        <input
          type="number"
          placeholder="Pontszám"
          min={1}
          className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={question.points}
          onChange={(e) =>
            setQuestion({ ...question, points: Number(e.currentTarget.value) })
          }
        />
      </FormInput>
      <div className="flex items-end justify-end">
        <ListFormRemoveButton onClick={removeQuestion} />
      </div>
    </div>

    <ImageURLForm
      label="Kérdéshez tartozó kép (URL, opcionális)"
      placeholder="Kép URL"
      disabled={false}
      url={question.imageUrl ?? ''}
      onChange={(imageUrl) => setQuestion({ ...question, imageUrl })}
    />

    <OptionsForm
      options={question.options}
      setOptions={(options) => setQuestion({ ...question, options })}
    />
    <hr />
  </div>
);
