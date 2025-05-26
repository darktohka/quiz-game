import { Packr } from 'msgpackr';

export const packer = new Packr({
  bundleStrings: true,
  useRecords: true,
});

export const unpack = <T>(data: Uint8Array): T => packer.unpack(data) as T;

export const pack = <T>(data: T): Uint8Array =>
  Uint8Array.from(packer.pack(data));
