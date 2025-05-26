import { ComponentChildren } from 'preact';

export type FormInputProps = {
  children: ComponentChildren;
};

export const FormInput = ({ children }: FormInputProps) => (
  <div>{children}</div>
);
