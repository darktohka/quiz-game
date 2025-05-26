import { SafeUserDTO } from 'shared/src/dto/user';

export const mapUserToSafeUser = (user: SafeUserDTO): SafeUserDTO => ({
  id: user.id,
  email: user.email,
  name: user.name,
});
