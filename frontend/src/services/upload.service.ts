import { buildUrl, headers } from '@/utils/service.util';
import { ResponseDTO } from 'shared/src/dto/generic';
import { UploadResultDTO } from 'shared/src/dto/upload';
import { unpackBlob } from 'shared/src/utils/pack.util';

export const uploadImage = async (file: File): Promise<UploadResultDTO> => {
  const body = new FormData();
  body.append('file', file);

  const res = await fetch(buildUrl('/api/upload'), {
    method: 'POST',
    body,
    headers: headers(),
  });

  const blob = await res.blob();
  const response = await unpackBlob<ResponseDTO>(blob);

  if (response.errors) {
    throw response;
  }

  return response.data as UploadResultDTO;
};
