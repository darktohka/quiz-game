import { showErrors, showIssues } from '@/utils/error.util';
import { useRouter } from '@react-nano/router';
import React from 'preact/compat';
import { useState } from 'preact/hooks';
import { UserLoginDTO, UserLoginSchema } from 'shared/src/dto/user';
import * as v from 'valibot';
import { useAuth } from '../hooks/use-auth';
import { login } from '../services/user.service';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const { setAuthToken } = useAuth();
  const { history } = useRouter();

  const handleLogin = async () => {
    const prevalidation: UserLoginDTO = { email, password };
    const {
      output: data,
      success,
      issues,
    } = v.safeParse(UserLoginSchema, prevalidation);

    if (!success) {
      showIssues(issues);
      return;
    }

    setLoggingIn(true);

    try {
      const { token } = await login(data);
      setAuthToken(token);
      history.push('/admin');
    } catch (error) {
      showErrors(error as Error);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleKeyUp = (
    e: React.JSX.TargetedKeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="bg-white text-black h-screen w-screen">
      <div className="lg-gray-100 text-grayasblack flex flex-col items-center justify-between relative">
        <div className="w-full max-w-md p-8 space-y-8">
          <div>
            <img className="h-[10rem] w-auto mx-auto" src="/logo.png" />
            <h2 className="mt-6 text-3xl font-extrabold">Bejelentkezés</h2>
            <p className="mt-2 text-sm text-gray-600">Válassz egy fiókot</p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-[1rem]">
              <div>
                <span className="">E-mail:</span>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none bg-white relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-700 text-black rounded-t-md rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="E-mail"
                  value={email}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  onKeyUp={handleKeyUp}
                  disabled={loggingIn}
                />
              </div>
              <div>
                <span className="">Jelszó:</span>
                <label htmlFor="password" className="sr-only">
                  Jelszó
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none bg-white relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-700 text-black rounded-t-md rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Jelszó"
                  value={password}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  onKeyUp={handleKeyUp}
                  disabled={loggingIn}
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleLogin}
                disabled={loggingIn}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:cursor-not-allowed"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 mb-8 font-medium">
          <span>Nem vagy regisztrálva?</span>{' '}
          <span className="text-orange-600 hover:text-orange-500">
            Kérj egy fiókot!
          </span>
        </div>
      </div>
    </div>
  );
};
