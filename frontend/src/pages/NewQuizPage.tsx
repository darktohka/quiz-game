import { Card } from '@/components/Card';
import { Page } from './Page';
import { NewQuizForm } from '@/forms/NewQuizForm';

export const NewQuizPage = () => (
  <Page title="Új kvíz">
    <Card>
      <NewQuizForm />
    </Card>
  </Page>
);
