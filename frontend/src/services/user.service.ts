import {
  SafeUserDTO,
  UserLoginDTO,
  UserLoginResponseDTO,
} from 'shared/src/dto/user';
import {
  buildUrl,
  sendRequestWithBody,
  useFetchEndpoint,
} from '../utils/service.util';

export const login = async (login: UserLoginDTO) =>
  sendRequestWithBody<UserLoginDTO, UserLoginResponseDTO>(
    buildUrl('/api/login'),
    'POST',
    login
  );

export const useUsers = () => useFetchEndpoint<SafeUserDTO[]>('/api/users');
