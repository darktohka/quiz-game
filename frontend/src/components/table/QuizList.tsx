import { showErrors } from '@/utils/error.util';
import { Link } from '@react-nano/router';
import { EditIcon, TrashIcon } from 'lucide-preact';
import { BallTriangle } from 'react-loading-icons';
import { Error } from '../Error';
import { YesNoModal } from '../modal/YesNoModal';
import { Table } from './Table';

import 'react-responsive-modal/styles.css';
import { useState } from 'preact/hooks';
import { deleteQuiz, useQuizzes } from '@/services/quiz.service';
import { QuizDTO } from 'shared/src/dto/quiz';

export const QuizList = () => {
  const { data: quizzes, isLoading, error, mutate } = useQuizzes();
  const [toDelete, setToDelete] = useState<QuizDTO | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (isLoading) {
    return <BallTriangle stroke="currentColor" />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const columns = [
    {
      title: 'Téma',
      minWidth: '220px',
      render: (item: QuizDTO) => (
        <h5 className="font-medium text-white">{item.title}</h5>
      ),
      renderValue: (item: QuizDTO) => item.title,
    },
    {
      title: 'Műveletek',
      render: (item: QuizDTO) => (
        <div className="flex items-center space-x-3.5">
          <Link href={`/admin/quiz/${item.id}`} className="hover:text-blue-400">
            <EditIcon size="18" className="text-white" />
          </Link>
          <button
            className="hover:text-blue-400"
            onClick={() => {
              setToDelete(item);
              setDeleteModalOpen(true);
            }}
          >
            <TrashIcon size="18" />
          </button>
        </div>
      ),
      renderValue: () => '',
    },
  ];

  const handleDelete = async () => {
    if (!toDelete) {
      return;
    }

    try {
      await deleteQuiz(toDelete.id);
      await mutate();
    } catch (error) {
      showErrors(error as Error);
    }
  };
  return (
    <>
      <Table columns={columns} rows={quizzes} pageSize={10} />
      <YesNoModal
        title="Quiz törlése"
        content={
          <p>
            Biztos vagy benne, hogy törölni szeretnéd a{' '}
            <span className="font-bold">{toDelete?.title}</span> nevű quizt?
          </p>
        }
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onAgree={handleDelete}
      />
    </>
  );
};
