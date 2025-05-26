import { Footer } from './Footer';
import { hu } from '@/locales/hu';

export const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {hu.loadingQuizzes}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid" />
      </div>
    </div>
    <Footer />
  </div>
);
