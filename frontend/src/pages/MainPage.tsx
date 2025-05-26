import { Link } from '@react-nano/router';
import { Page } from './Page';

export const MainPage = () => (
  <Page title="Főoldal">
    <div className="flex flex-col">
      <h1 className="text-xl font-bold dark:text-white">
        Üdvözöljük az admin felületen!
      </h1>

      <Link
        href="/admin/quiz"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-[9.5rem]"
      >
        Kvízek kezelése
      </Link>
    </div>
  </Page>
);
