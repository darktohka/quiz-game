import { Card } from '@/components/Card';
import { useParams } from '@react-nano/router';
import { Page } from './Page';
import { EditQuizForm } from '@/forms/EditQuizForm';

export type EditQuizPageParams = {
  id: string;
};

export const EditQuizPage = () => {
  const { id } = useParams<EditQuizPageParams>('/admin/quiz/:id');

  return (
    <Page title="Quiz szerkesztése">
      <Card>
        <EditQuizForm id={id} />
      </Card>
    </Page>
  );
};
