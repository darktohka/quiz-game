import * as v from 'valibot';
import { Errors } from './error';
import { IdSchema } from './generic';

export const UserSchema = v.object({
  id: IdSchema,
  email: v.pipe(v.string(), v.email(), v.maxLength(255)),
  password: v.pipe(v.string(), v.maxLength(255)),
  name: v.pipe(v.string(), v.minLength(2), v.maxLength(100)),
});

export const SafeUserSchema = v.omit(UserSchema, ['password']);

export const UserLoginSchema = v.object({
  email: v.pipe(
    v.string(Errors.EMAIL_NOT_STRING),
    v.email(Errors.EMAIL_NOT_EMAIL),
    v.maxLength(255, Errors.EMAIL_MAX_LENGTH)
  ),
  password: v.pipe(
    v.string(Errors.PASSWORD_NOT_STRING),
    v.minLength(6, Errors.PASSWORD_MIN_LENGTH),
    v.maxLength(255, Errors.PASSWORD_MAX_LENGTH)
  ),
});

export const UserRegisterSchema = v.object({
  email: v.pipe(
    v.string(Errors.EMAIL_NOT_STRING),
    v.email(Errors.EMAIL_NOT_EMAIL),
    v.maxLength(255, Errors.EMAIL_MAX_LENGTH)
  ),
  password: v.pipe(
    v.string(Errors.PASSWORD_NOT_STRING),
    v.minLength(6, Errors.PASSWORD_MIN_LENGTH),
    v.maxLength(255, Errors.PASSWORD_MAX_LENGTH)
  ),
  name: v.pipe(
    v.string(Errors.NAME_NOT_STRING),
    v.minLength(2, Errors.NAME_MIN_LENGTH),
    v.maxLength(100, Errors.NAME_MAX_LENGTH)
  ),
});

export const UserLoginResponseSchema = v.object({
  token: v.string(),
});

export type UserDTO = v.InferOutput<typeof UserSchema>;
export type SafeUserDTO = v.InferOutput<typeof SafeUserSchema>;
export type UserLoginDTO = v.InferOutput<typeof UserLoginSchema>;
export type UserRegisterDTO = v.InferOutput<typeof UserRegisterSchema>;
export type UserLoginResponseDTO = v.InferOutput<
  typeof UserLoginResponseSchema
>;
