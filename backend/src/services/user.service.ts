import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { Errors } from 'shared/src/dto/error';
import {
  SafeUserDTO,
  UserLoginDTO,
  UserLoginResponseDTO,
  UserRegisterDTO,
} from 'shared/src/dto/user';
import { JWT_SECRET } from '../constants';
import { mapUserToSafeUser } from '../mappers/user.mapper';
import { db } from './database.service';
import { nanoid } from 'shared/src/utils/nanoid.util';

export const loginUser = async (login: UserLoginDTO): Promise<SafeUserDTO> => {
  const { email, password } = login;
  const user = await db
    .selectFrom('user')
    .where('email', '=', email)
    .selectAll()
    .executeTakeFirst();

  if (!user) {
    throw new HTTPException(400, { message: Errors.INVALID_CREDENTIALS });
  }

  if (!(await Bun.password.verify(user.password, password))) {
    throw new HTTPException(400, { message: Errors.INVALID_CREDENTIALS });
  }

  return mapUserToSafeUser(user);
};

export const loginUserWithJWT = async (
  login: UserLoginDTO
): Promise<UserLoginResponseDTO> => {
  const user = await loginUser(login);
  const token = await sign(user, JWT_SECRET, 'HS256');

  return { token };
};

export const registerUser = async (
  register: UserRegisterDTO
): Promise<SafeUserDTO> => {
  const { email, password, name } = register;
  const user = {
    id: nanoid(),
    email,
    password: await Bun.password.hash(password),
    name,
  };

  await db.insertInto('user').values(user).execute();

  return mapUserToSafeUser(user);
};

export const getUsers = async (): Promise<SafeUserDTO[]> => {
  const users = await db
    .selectFrom('user')
    .select(['id', 'name', 'email'])
    .execute();
  return users.map(mapUserToSafeUser);
};
