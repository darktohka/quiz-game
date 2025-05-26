import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { ValiError } from 'valibot';
//import categoryRoutes from './category.route';
//import tagRoutes from './tag.route';
//import projectRoutes from './project.route';
import userRoutes from './user.route';
import quizRoutes from './quiz.route';
//import newsRoutes from './news.route';
//import teamMemberRoutes from './teammember.route';
//import releaseRoutes from './release.route';
import uploadRoutes from './upload.route';
import { serveStatic } from 'hono/bun';
import { migrateToLatest } from '../services/database.service';
import { SQLiteError } from 'bun:sqlite';
import { NoResultError } from 'kysely';
import { Errors } from 'shared/src/dto/error';
import { pack } from 'msgpackr';
import { ResponseDTO } from 'shared/src/dto/generic';

const app = new Hono()
  .use(logger())
  .use(cors())
  .get(
    '/images/*',
    serveStatic({
      root: './',
    })
  )
  .route('/api', userRoutes)
  .route('/api', quizRoutes)
  .route('/api', uploadRoutes)
  //.route('/api', categoryRoutes)
  //.route('/api', tagRoutes)
  //.route('/api', projectRoutes)
  //.route('/api', newsRoutes)
  //.route('/api', teamMemberRoutes)
  //.route('/api', releaseRoutes)
  //.route('/api', uploadRoutes)
  .onError((err) => {
    if (err instanceof HTTPException) {
      // Get the custom response
      return new Response(
        new Uint8Array(pack({ errors: [err.message] } as ResponseDTO)),
        { status: err.status }
      );
    }

    if (err instanceof ValiError) {
      console.log(err.issues);
      return new Response(
        new Uint8Array(
          pack({
            errors: err.issues.map((issue) => issue.message),
          } as ResponseDTO)
        ),
        { status: 400 }
      );
    }

    if ((err as NoResultError).message === 'no result') {
      return new Response(
        new Uint8Array(
          pack({
            errors: [Errors.NO_RESOURCE_FOUND],
          } as ResponseDTO)
        ),
        { status: 404 }
      );
    }

    if ((err as SQLiteError).code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return new Response(
        new Uint8Array(
          pack({
            errors: [Errors.RESOURCE_ALREADY_EXISTS],
          } as ResponseDTO)
        ),
        { status: 400 }
      );
    }

    console.error(err);
    return new Response(
      new Uint8Array(
        pack({
          errors: [err.message],
        } as ResponseDTO)
      ),
      { status: 500 }
    );
  });

export type AppType = typeof app;

await migrateToLatest();

export default {
  fetch: app.fetch,
  hostname: '::',
};
