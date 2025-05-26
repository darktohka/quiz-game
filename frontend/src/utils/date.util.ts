export const formatDateTime = (date: Date | string) => {
  const actualDate = new Date(date);
  return actualDate.getTime() == 0
    ? 'Soha'
    : actualDate.toISOString().replace('T', ' ').split('.')[0];
};

export const getDateWithoutSeconds = (date: Date) => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
