import { Context } from 'hono';
import { pack } from '../services/pack.service';
import { ResponseDTO } from 'shared/src/dto/generic';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export const success = <T>(c: Context, data: T) =>
  c.body(pack({ data } as ResponseDTO), 200);

export const successEmpty = (c: Context) =>
  c.body(pack({} as ResponseDTO), 200);

export const error = (
  c: Context,
  status: ContentfulStatusCode,
  error: string
) => c.body(pack({ error } as ResponseDTO), status);
