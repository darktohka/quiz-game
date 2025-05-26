import { Context } from 'hono';
import { getConnInfo } from 'hono/bun';

export const getIpAddress = (req: Context): string | undefined => {
  try {
    return getConnInfo(req).remote.address;
  } catch {
    return;
  }
};
