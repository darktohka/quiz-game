import { Packr } from 'msgpackr';

export const packer = new Packr({
  bundleStrings: true,
  useRecords: true,
  mapsAsObjects: true,
});

export const unpack = <T>(data: Buffer): T => packer.unpack(data) as T;

export const unpackBlob = async <T>(data: Blob): Promise<T> => {
  const buffer = await data.arrayBuffer();
  return packer.unpack(new Uint8Array(buffer)) as T;
};

export const pack = <T>(data: T): Uint8Array =>
  Uint8Array.from(packer.pack(data));
