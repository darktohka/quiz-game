import * as v from 'valibot';
import { Errors } from './error';
import { IdSchema } from './generic';

export const QuestionOptionSchema = v.object({
  answer: v.pipe(
    v.string(),
    v.minLength(1, Errors.ANSWER_TOO_SHORT),
    v.maxLength(150, Errors.ANSWER_TOO_LONG)
  ),
  isCorrect: v.boolean(),
});

export const QuestionSchema = v.object({
  question: v.pipe(
    v.string(),
    v.minLength(1, Errors.QUESTION_TOO_SHORT),
    v.maxLength(150, Errors.QUESTION_TOO_LONG)
  ),
  imageUrl: v.nullable(
    v.optional(
      v.pipe(
        v.string(),
        v.maxLength(255, Errors.IMAGE_URL_TOO_LONG),
        v.url(Errors.IMAGE_URL_INVALID)
      )
    )
  ),
  points: v.pipe(v.number(), v.minValue(0, Errors.POINTS_TOO_LOW)),
  options: v.pipe(
    v.array(QuestionOptionSchema),
    v.minLength(2, Errors.QUESTION_NO_OPTIONS),
    v.custom(
      (options: unknown) =>
        Array.isArray(options) &&
        options.some(
          (opt) =>
            typeof opt === 'object' &&
            opt !== null &&
            'isCorrect' in opt &&
            (opt as { isCorrect: boolean }).isCorrect === true
        ),
      Errors.QUESTION_NO_CORRECT_OPTIONS
    )
  ),
});

export const QuestionSetSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, Errors.QUESTION_SET_TITLE_TOO_SHORT),
    v.maxLength(150, Errors.QUESTION_SET_TITLE_TOO_LONG)
  ),
  description: v.pipe(
    v.string(),
    v.maxLength(20000, Errors.QUESTION_SET_DESCRIPTION_TOO_LONG)
  ),
  minimumPoints: v.pipe(v.number(), v.minValue(0, Errors.MIN_POINTS_TOO_LOW)),
  questionsToChoose: v.pipe(
    v.number(),
    v.minValue(1, Errors.QUESTIONS_TO_CHOOSE_TOO_LOW)
  ),
  questions: v.pipe(
    v.array(QuestionSchema),
    v.minLength(1, Errors.QUESTION_SET_NO_QUESTIONS)
  ),
});

export const BaseQuizSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, Errors.QUIZ_TITLE_TOO_SHORT),
    v.maxLength(150, Errors.QUIZ_TITLE_TOO_LONG)
  ),
  description: v.pipe(
    v.string(),
    v.maxLength(20000, Errors.QUIZ_DESCRIPTION_TOO_LONG)
  ),
  imageUrl: v.pipe(
    v.string(),
    v.maxLength(255, Errors.IMAGE_URL_TOO_LONG),
    v.url(Errors.IMAGE_URL_INVALID)
  ),
  questionSets: v.pipe(
    v.array(QuestionSetSchema),
    v.minLength(1, Errors.QUIZ_NO_QUESTION_SETS)
  ),
});
export const QuizSchema = v.object({
  id: IdSchema,
  ...BaseQuizSchema.entries,
});

export type QuestionOptionDTO = v.InferOutput<typeof QuestionOptionSchema>;
export type QuestionDTO = v.InferOutput<typeof QuestionSchema>;
export type QuestionSetDTO = v.InferOutput<typeof QuestionSetSchema>;
export type BaseQuizDTO = v.InferOutput<typeof BaseQuizSchema>;
export type QuizDTO = v.InferOutput<typeof QuizSchema>;
