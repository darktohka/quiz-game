import { BaseQuizDTO, QuizDTO } from 'shared/src/dto/quiz';
import { db } from './database.service';
import { pack, unpack } from './pack.service';
import { nanoid } from 'shared/src/utils/nanoid.util';
import { HTTPException } from 'hono/http-exception';
import { Errors } from 'shared/src/dto/error';

export const getQuizzes = async (): Promise<QuizDTO[]> => {
  const quizzes = (await db.selectFrom('quiz').select('data').execute()).map(
    (quiz) => unpack<QuizDTO>(quiz.data)
  );

  return quizzes;
};

export const getQuiz = async (id: string): Promise<QuizDTO> => {
  const quiz = unpack<QuizDTO>(
    (
      await db
        .selectFrom('quiz')
        .select('data')
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    ).data
  );

  return quiz;
};

export const createQuiz = async (createDTO: BaseQuizDTO): Promise<QuizDTO> => {
  const id = nanoid();
  const quiz: QuizDTO = { ...createDTO, id };

  await db
    .insertInto('quiz')
    .values({ id, data: pack(quiz) })
    .execute();

  return quiz;
};

export const updateQuiz = async (
  id: string,
  updateDTO: BaseQuizDTO
): Promise<QuizDTO> => {
  const quiz: QuizDTO = { ...updateDTO, id };
  const result = await db
    .updateTable('quiz')
    .set({ data: pack(quiz) })
    .where('id', '=', id)
    .executeTakeFirstOrThrow();

  if (!result || result.numUpdatedRows === 0n) {
    throw new HTTPException(404, { message: Errors.NO_RESOURCE_FOUND });
  }

  return quiz;
};

export const deleteQuiz = async (id: string) => {
  const result = await db
    .deleteFrom('quiz')
    .where('id', '=', id)
    .executeTakeFirstOrThrow();

  if (!result || result.numDeletedRows === 0n) {
    throw new HTTPException(404, { message: Errors.NO_RESOURCE_FOUND });
  }
};
