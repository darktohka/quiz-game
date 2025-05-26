import { Context, Hono, Next } from 'hono';
import {
  SafeUserDTO,
  UserLoginResponseDTO,
  UserLoginSchema,
  UserRegisterSchema,
} from 'shared/src/dto/user';
import * as v from 'valibot';
import {
  getUsers,
  loginUserWithJWT,
  registerUser,
} from '../services/user.service';
import { verify } from 'hono/jwt';
import { HTTPException } from 'hono/http-exception';
import { JWT_SECRET } from '../constants';
import { success } from '../mappers/response.mapper';

const app = new Hono();

export const userRouteMiddleware = async (c: Context, next: Next) => {
  const authorizationHeader = c.req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }

  const token = authorizationHeader.substring(7);

  try {
    const decodedToken = (await verify(token, JWT_SECRET)) as SafeUserDTO;
    // You can access the decoded token properties like decodedToken.userId, decodedToken.username, etc.
    // Perform any necessary validation or checks here
    c.set('user', decodedToken);
  } catch {
    throw new HTTPException(401, { message: 'Invalid token' });
  }

  await next();
};

app.get('/users', async (c) => {
  const data = await getUsers();

  const output: SafeUserDTO[] = data;
  return success(c, output);
});

app.post('/login', async (c) => {
  const body = v.parse(UserLoginSchema, await c.req.json());

  // Validation successful, proceed with login
  const data = await loginUserWithJWT(body);

  const output: UserLoginResponseDTO = data;
  return success(c, output);
});

app.post('/register', async (c) => {
  const body = v.parse(UserRegisterSchema, await c.req.json());

  // Validation successful, proceed with login
  const data = await registerUser(body);

  const output: SafeUserDTO = data;
  return success(c, output);
});

export default app;
