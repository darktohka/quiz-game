import { useLocalStorage } from '@uidotdev/usehooks';
import { decode } from 'hono/jwt';
import { useEffect, useMemo } from 'preact/hooks';
import { SafeUserDTO } from 'shared/src/dto/user';

export const useAuth = () => {
  const [token, setAuthToken] = useLocalStorage('token-quiz', '');
  const user = useMemo(() => {
    if (!token) {
      return null;
    }

    const { payload } = decode(token);
    return payload as SafeUserDTO;
  }, [token]);

  const checkValidity = async () => {
    if (!token) {
      return false;
    }

    try {
      return true;
    } catch (error) {
      setAuthToken('');
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    void checkValidity();
  }, [token]);

  return { user, token, setAuthToken };
};
