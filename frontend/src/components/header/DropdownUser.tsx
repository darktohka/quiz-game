import { useAuth } from '@/hooks/use-auth';
import { Link, useRouter } from '@react-nano/router';
import { useState } from 'preact/hooks';
import { ClickOutside } from '../ClickOutside';
import { ChevronDown, LogOutIcon } from 'lucide-preact';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setAuthToken } = useAuth();
  const { history } = useRouter();

  const logout = () => {
    setAuthToken('');
    history.push('/admin/login');
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <>
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-white">
              {user?.name}
            </span>
            <span className="block text-xs text-white uppercase">admin</span>
          </span>

          <span className="h-12 w-12 rounded-full">
            <img src="/logo.png" alt="User" />
          </span>

          <ChevronDown className="hidden h-4 w-4 text-white sm:block" />
        </Link>
        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <div
            className={`absolute text-white right-0 mt-4 flex w-62.5 flex-col rounded-sm border shadow-default border-strokedark bg-boxdark`}
          >
            <button
              className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-blue-400 lg:text-base"
              onClick={logout}
            >
              <LogOutIcon className="w-[1rem] h-[1rem]" />
              Kijelentkezés
            </button>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </>
    </ClickOutside>
  );
};

export default DropdownUser;
