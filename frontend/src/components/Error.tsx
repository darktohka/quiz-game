export interface ErrorProps {
  error: string;
}

export const Error = ({ error }: ErrorProps) => {
  return <p>{error}</p>;
};
