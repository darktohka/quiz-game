import { ListFormRemoveButton } from '@/components/form/ListFormRemoveButton';
import { QuestionOptionDTO } from 'shared/src/dto/quiz';

export type OptionFormProps = {
  option: QuestionOptionDTO;
  setOption: (_option: QuestionOptionDTO) => void;
  removeOption: () => void;
};

export const OptionForm = ({
  option,
  setOption,
  removeOption,
}: OptionFormProps) => (
  <div className="flex flex-row gap-3 mx-[3rem]">
    <input
      type="text"
      placeholder="Válasz"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      value={option.answer}
      onChange={(e) => setOption({ ...option, answer: e.currentTarget.value })}
    />
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={option.isCorrect}
        onChange={(e) =>
          setOption({ ...option, isCorrect: e.currentTarget.checked })
        }
        className="accent-primary"
      />
      Helyes
    </label>

    <ListFormRemoveButton onClick={removeOption} />
    <hr />
  </div>
);
