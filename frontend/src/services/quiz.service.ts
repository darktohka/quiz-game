import {
  buildUrl,
  sendRequestNoBody,
  sendRequestWithBody,
  useFetchEndpoint,
} from '@/utils/service.util';
import { QuizTable } from 'backend/src/services/database.service';
import { BaseQuizDTO, QuizDTO } from 'shared/src/dto/quiz';

export const useQuizzes = () => useFetchEndpoint<QuizDTO[]>('/api/quiz');

export const useQuiz = (id: string) =>
  useFetchEndpoint<QuizTable>(`/api/quiz/${id}`);

export const createQuiz = async (body: BaseQuizDTO) =>
  sendRequestWithBody<BaseQuizDTO, QuizDTO>(
    buildUrl('/api/quiz'),
    'POST',
    body
  );

export const updateQuiz = async (id: string, body: BaseQuizDTO) =>
  sendRequestWithBody<BaseQuizDTO, QuizDTO>(
    buildUrl(`/api/quiz/${id}`),
    'PATCH',
    body
  );

export const deleteQuiz = async (id: string) =>
  sendRequestNoBody(buildUrl(`/api/quiz/${id}`), 'DELETE');
