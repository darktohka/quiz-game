import * as v from 'valibot';
import { Errors } from './error';

export const IdSchema = v.pipe(
  v.string(Errors.ID_NOT_STRING),
  v.length(21, Errors.ID_INVALID)
);

export const SlugSchema = v.pipe(
  v.string(Errors.SLUG_NOT_STRING),
  v.minLength(1, Errors.SLUG_MIN_LENGTH),
  v.maxLength(100, Errors.SLUG_MAX_LENGTH)
);

export const IdOrSlugSchema = v.union([IdSchema, SlugSchema]);

export const DateSchema = v.pipe(
  v.union([v.date(), v.string()]),
  v.transform((input) => new Date(input))
);

export const ResponseSchema = v.object({
  errors: v.optional(v.array(v.string())),
  data: v.optional(v.any()),
});

export type ResponseDTO = v.InferOutput<typeof ResponseSchema>;
