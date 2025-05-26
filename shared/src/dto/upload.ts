import * as v from 'valibot';

export const UploadResultSchema = v.object({
  url: v.pipe(v.string(), v.url()),
});

export type UploadResultDTO = v.InferOutput<typeof UploadResultSchema>;
