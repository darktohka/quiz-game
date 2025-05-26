import { exists, mkdir, writeFile } from 'fs/promises';
import { HTTPException } from 'hono/http-exception';
import { dirname, join } from 'path';
import { Errors } from 'shared/src/dto/error';

const PNG_HEADER = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const JPG_HEADER = new Uint8Array([0xff, 0xd8, 0xff]);

const JPEG_OPTIONS = [
  'jpegoptim',
  '--strip-all',
  '--force',
  '--all-progressive',
  '--stdin',
  '--stdout',
];
const PNG_OPTIONS = ['oxipng', '--opt', '1', '--strip', 'safe', '--alpha', '-'];

const IMAGES_DIR = process.env.IMAGES_DIR || 'images';
const IMAGES_URL = process.env.IMAGES_URL || 'http://localhost:3000/images';

const doesUint8ArrayBegin = (a: Uint8Array, b: Uint8Array) => {
  if (a.length < b.length) {
    return false;
  }

  for (let i = 0; i < b.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

const getHash = (processedData: Uint8Array): string =>
  new Bun.CryptoHasher('shake128').update(processedData).digest('hex');

const getHashFilename = (
  processedData: Uint8Array,
  extension: string
): string => {
  const fullHash = getHash(processedData);
  return `${fullHash}${extension}`;
};

const commitFile = async (diskFilename: string, data: Uint8Array) => {
  if (await exists(diskFilename)) {
    return;
  }

  const directory = dirname(diskFilename);

  if (!(await exists(directory))) {
    await mkdir(directory, { recursive: true });
  }

  await writeFile(diskFilename, data);
};

const uploadImage = async (processedData: Uint8Array, extension: string) => {
  const hashFilename = getHashFilename(processedData, extension);
  const diskFilename = join(IMAGES_DIR, hashFilename);
  const url = `${IMAGES_URL}/${hashFilename}`;

  await commitFile(diskFilename, processedData);
  return url;
};

export const uploadFile = async (data: Uint8Array): Promise<string> => {
  const [args, extension] = doesUint8ArrayBegin(data, PNG_HEADER)
    ? [PNG_OPTIONS, '.png']
    : doesUint8ArrayBegin(data, JPG_HEADER)
      ? [JPEG_OPTIONS, '.jpg']
      : [[], null];

  if (!extension) {
    throw new HTTPException(400, { message: Errors.UNSUPPORTED_IMAGE_FORMAT });
  }

  const process = Bun.spawn(args, { stdin: data });
  const outputBytes = new Uint8Array(
    await new Response(process.stdout).arrayBuffer()
  );

  if (outputBytes.length === 0) {
    throw new HTTPException(500, { message: Errors.IMAGE_UPLOAD_FAILED });
  }

  return uploadImage(outputBytes, extension);
};
