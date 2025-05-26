import { Card } from '@/components/Card';
import { Link } from '@react-nano/router';
import { Page } from './Page';
import AddSvg from '@/components/AddSvg';
import { QuizList } from '@/components/table/QuizList';

export const QuizPage = () => (
  <Page title="Kvízek">
    <Card>
      <>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <Link
            href="/admin/quiz/new"
            className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 transition duration-500 w-[16rem]"
          >
            <AddSvg />
            Új kvíz
          </Link>
        </div>
        <div className="py-4 px-6.5">
          <QuizList />
        </div>
      </>
    </Card>
  </Page>
);
