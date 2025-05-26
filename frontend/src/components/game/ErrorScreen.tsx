import { Footer } from './Footer';

export interface ErrorScreenProps {
  error: string;
}

export const ErrorScreen = ({ error }: ErrorScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-200 p-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 mt-12">
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">⚠️ {error}</p>
      </div>
    </div>
    <Footer />
  </div>
);
