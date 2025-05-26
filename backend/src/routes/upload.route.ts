import { Hono } from 'hono';
import { userRouteMiddleware } from './user.route';
import { uploadFile } from '../services/upload.service';
import { UploadResultDTO } from 'shared/src/dto/upload';
import { error, success } from '../mappers/response.mapper';

const app = new Hono();

app.post('/upload', userRouteMiddleware, async (c) => {
  const { file } = await c.req.parseBody();

  if (!(file instanceof File)) {
    return error(c, 400, 'Invalid file');
  }

  const inputData = new Uint8Array(await file.arrayBuffer());
  const url = await uploadFile(inputData);

  const output: UploadResultDTO = { url };
  return success(c, output);
});

export default app;
