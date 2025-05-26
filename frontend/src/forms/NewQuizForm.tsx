import { showErrors, showIssues } from '@/utils/error.util';
import { Link, useRouter } from '@react-nano/router';
import { useEffect, useState } from 'preact/hooks';
import * as v from 'valibot';
import { BaseQuizDTO, BaseQuizSchema, QuizDTO } from 'shared/src/dto/quiz';
import { createQuiz, updateQuiz } from '@/services/quiz.service';
import { FormLabel } from '@/components/form/FormLabel';
import { ImageURLForm } from './ImageURLForm';
import { FormInput } from '@/components/form/FormInput';
import { QuestionSetsForm } from './QuestionSetsForm';

export type NewQuizFormProps = {
  quiz?: QuizDTO;
};

export const NewQuizForm = ({ quiz }: NewQuizFormProps) => {
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<BaseQuizDTO>({
    title: '',
    description: '',
    imageUrl: '',
    questionSets: [],
  });
  const [creating, setCreating] = useState<boolean>(false);
  const { history } = useRouter();

  useEffect(() => {
    if (quiz) {
      setId(quiz.id);
      setData({ ...quiz });
    }
  }, [quiz]);

  const handleSave = () => (quiz ? handleUpdate() : handleCreate());

  const handleCreate = async () => {
    const { output, success, issues } = v.safeParse(BaseQuizSchema, data);

    if (!success) {
      showIssues(issues);
      return;
    }

    setCreating(true);

    try {
      await createQuiz(output);
      history.push('/admin/quiz');
    } catch (error) {
      showErrors(error as Error);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async () => {
    if (!quiz) {
      return;
    }

    const { output, success, issues } = v.safeParse(BaseQuizSchema, {
      ...data,
      id,
    });

    if (!success) {
      showIssues(issues);
      return;
    }

    setCreating(true);

    try {
      await updateQuiz(id, output);
      history.push('/admin/quiz');
    } catch (error) {
      showErrors(error as Error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-5.5 p-6.5">
      <FormInput>
        <FormLabel label="Cím" />
        <input
          type="text"
          placeholder="Kviz neve"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          onChange={(e) => setData({ ...data, title: e.currentTarget.value })}
          value={data.title}
          disabled={creating}
        />
      </FormInput>

      <FormInput>
        <FormLabel label="Leírás" />
        <input
          type="text"
          placeholder="Kvíz leírása"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          onChange={(e) =>
            setData({ ...data, description: e.currentTarget.value })
          }
          value={data.description}
          disabled={creating}
        />
      </FormInput>

      <ImageURLForm
        label="Puzzledarab kép URL"
        placeholder="Kép URL"
        disabled={creating}
        url={data.imageUrl ?? ''}
        onChange={(imageUrl) => setData({ ...data, imageUrl })}
      />

      <QuestionSetsForm
        sets={data.questionSets}
        setSets={(sets) => setData({ ...data, questionSets: sets })}
      />

      {/*<TagsInputForm
        tagIds={projectData.tags ?? []}
        setTagIds={(tags) => setProjectData({ ...projectData, tags })}
      />*/}

      <div className="flex flex-row gap-[1rem]">
        <button
          className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 transition duration-500 w-full disabled:cursor-not-allowed disabled:bg-opacity-70"
          disabled={creating}
          onClick={handleSave}
        >
          Mentés
        </button>
        <Link
          href="/admin/quiz"
          className="flex justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90 transition duration-500 w-full"
        >
          Vissza
        </Link>
      </div>
    </div>
  );
};
