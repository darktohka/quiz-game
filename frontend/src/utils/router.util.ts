import { RouteParams } from '@react-nano/router';
import { match, MatchResult } from 'path-to-regexp';

export const routeMatcherFactory = (pattern: string) => {
  const matcher = match(pattern);

  return (path: string) => (matcher(path) as MatchResult<RouteParams>).params;
};
