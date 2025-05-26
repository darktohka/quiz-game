export const firstOf = (field: string | string[] | undefined): string => {
  if (typeof field === 'undefined') {
    return '';
  }

  if (Array.isArray(field)) {
    return field[0];
  }

  return field;
};
