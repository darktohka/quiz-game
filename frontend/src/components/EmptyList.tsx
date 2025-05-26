import { BirdIcon } from 'lucide-preact';

export const EmptyList = () => {
  return (
    <div className="flex flex-col items-center justify-center text-bodydark">
      <BirdIcon stroke="currentColor" size="96" />
      <p className="text-gray-1 font-medium text-lg">Nincs találat!</p>
    </div>
  );
};
