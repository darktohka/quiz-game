import { Hono } from 'hono';
import { IdSchema } from 'shared/src/dto/generic';
import * as v from 'valibot';
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  getQuizzes,
  updateQuiz,
} from '../services/quiz.service';
import { BaseQuizSchema } from 'shared/src/dto/quiz';
import { success, successEmpty } from '../mappers/response.mapper';

const app = new Hono();

app.get('/quiz', async (c) => {
  const quizzes = await getQuizzes();
  return success(c, quizzes);
});

app.get('/quiz/:id', async (c) => {
  const id = c.req.param('id');
  v.parse(IdSchema, id);

  const quiz = await getQuiz(id);
  return success(c, quiz);
});

app.post('/quiz', async (c) => {
  const body = v.parse(BaseQuizSchema, await c.req.json());
  const data = await createQuiz(body);

  return success(c, data);
});

app.patch('/quiz/:id', async (c) => {
  const id = c.req.param('id');
  v.parse(IdSchema, id);

  const body = v.parse(BaseQuizSchema, await c.req.json());
  const data = await updateQuiz(id, body);

  return success(c, data);
});

app.delete('/quiz/:id', async (c) => {
  const id = c.req.param('id');
  v.parse(IdSchema, id);

  await deleteQuiz(id);
  return successEmpty(c);
});

export default app;
