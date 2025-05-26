const a = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export const nanoid = (e: number = 21): string => {
  let t = '';
  const r = crypto.getRandomValues(new Uint8Array(e));

  for (let n = 0; n < e; n++) {
    t += a[63 & r[n]];
  }

  return t;
};
