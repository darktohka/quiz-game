import toast from 'react-hot-toast';
import { ResponseDTO } from 'shared/src/dto/generic';
import * as v from 'valibot';

export const formatIssues = (issues: v.BaseIssue<unknown>[]) =>
  issues.map((issue) => issue.message).join('\n');

export const showIssues = (issues: v.BaseIssue<unknown>[]) => {
  if (issues.length === 0) {
    return;
  }

  const message = formatIssues(issues);

  toast.error(message, {
    icon: '❌',
  });
};

export const showErrors = (error: Error | ResponseDTO) => {
  console.error(error);
  if ((error as ResponseDTO).errors) {
    toast.error(((error as ResponseDTO).errors ?? []).join('\n'), {
      icon: '❌',
    });
    return;
  }

  toast.error((error as Error).message);
};
