import { JSX } from 'preact/jsx-runtime';

export interface CardProps {
  children: JSX.Element;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-sm border shadow-default border-strokedark bg-boxdark p-[3rem]">
      {children}
    </div>
  );
};
