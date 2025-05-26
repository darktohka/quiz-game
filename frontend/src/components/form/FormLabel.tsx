export interface FormLabelProps {
  label: string;
}

export const FormLabel = ({ label }: FormLabelProps) => (
  <label className="mb-3 block text-white">{label}</label>
);
