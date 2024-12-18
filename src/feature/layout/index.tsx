import { useCallback, useEffect, useState } from 'react';
import { LuSettings2 } from 'react-icons/lu';
import { Outlet, useNavigate } from 'react-router-dom'; // Import the hook for navigation
import logoImage from '~/assets/logo.png';
import { AuthRoutePath } from '~/routes';
import { getAllOrg } from '~/service/org';
import { getSetting } from '~/service/setting';
import { getUserDetail } from '~/service/user';
import { clearUser, getUser, getUserRole } from '~/storage/auth';
import { useOrgTreeStore } from '~/store/orgTree';
import { useSettingStore } from '~/store/setting';
import { ERole, IUser } from '~/type/user';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userRole = getUserRole();
  const user = getUser();
  const userId = user?.id;
  
  const [logonUser, setLogonUser] = useState<IUser>();

  useEffect(() => {
    if (!userId) return;
    getUserDetail(userId).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setLogonUser(data);
      }
    });
  }, [userId]);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleNavigation = (path: string) => {
    toggleDropdown();
    navigate(path); // Navigate to the specified path
  };

  const handleLogout = useCallback(() => {
    clearUser();
    navigate(AuthRoutePath.LOGIN);
  }, []);

  return (
    <header className="flex bg-teal-700 dark:bg-white flex-grow px-5 py-2 border-b  border-gray-200 w-full h-[20vh] max-h-16 bg-cover bg-center bg-no-repeat">
      <div className="flex-none">
        <div
          className="flex flex-grow mt-1 cursor-pointer"
          onClick={() => navigate(AuthRoutePath.DASHBOARD)}
        >
          <button
            className="hover:bg-gray-100 rounded-full w-9 h-9 mr-2
            transition-colors duration-100 flex justify-center items-center"
          >
            <img
              src={logoImage}
              alt="logo"
              className="object-cover w-32 md:w-48 lg:w-64 rounded-full"
            />
          </button>

          <div className="ml-2 my-auto text-3xl font-semibold text-white dark:text-gray-700">
            PHẦN MỀM DỊCH NGÔN NGỮ PHỤC VỤ TRINH SÁT, GIÁM SÁT TRÊN KGM
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>

      <div className="flex items-center justify-center">
        <button
          className="flex items-center px-4 py-2 text-left text-black hover:text-xl"
          onClick={() => navigate(AuthRoutePath.DASHBOARD)}
        >
          <i className="fas fa-home mr-2"></i> {/* Icon for Home */}
        </button>
        <div className={darkMode ? 'dark' : ''}>
          <div
            onClick={toggleDarkMode}
            className="mr-2 h-[1vw] w-[1vw] bg-white dark:bg-teal-100 text-black dark:text-white cursor-pointer hover:h-[1.5vw] hover:w-[1.5vw] hover:border-blue-500 dark:hover:border-teal-700"
          />
        </div>
        <div className="relative">
          <button
            className="hover:bg-gray-100 rounded-full
            w-9 h-9 mt-1 mr-2 transition-colors duration-100 shado flex justify-center items-center"
            onClick={toggleDropdown}
          >
            <LuSettings2 size={24} />
          </button>

          {/* Dropdown */}

          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 dark:bg-white bg-teal-50 border border-gray-200 rounded-lg shadow-lg z-10 ">
              {logonUser && (
                <div className="px-4 py-2 border-b border-gray-200">
                  <div className="font-medium text-gray-700">{logonUser.username}</div>
                  <div className="text-sm text-gray-600">{logonUser.fullname}</div>
                </div>
              )}
              <ul className="py-1">
                <li>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleNavigation('/statistical')}
                  >
                    <i className="fas fa-chart-bar mr-2"></i>
                    Thống kê
                  </button>
                </li>

                {userRole !== ERole.user && (
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => handleNavigation('/setting')}
                    >
                      <i className="fas fa-cog mr-2"></i>
                      Cài đặt
                    </button>
                  </li>
                )}
                {userRole !== ERole.user && (
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() =>
                        handleNavigation(AuthRoutePath.REGISTRATION)
                      }
                    >
                      <i className="fas fa-user-plus mr-2"></i>
                      Đăng ký
                    </button>
                  </li>
                )}
                {userRole !== ERole.user && (
                  <li>
                    <button
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() =>
                        handleNavigation(AuthRoutePath.USER_UPDATE)
                      }
                    >
                      <i className="fa-solid fa-users mr-2"></i>
                      Thiết lập
                    </button>
                  </li>
                )}
                <li>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleNavigation(AuthRoutePath.PASSWORD)}
                  >
                    <i className="fa-solid fa-lock-open mr-2"></i>
                    Đổi mật khẩu
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
const Layout = () => {
  const { addOrgs } = useOrgTreeStore();
  const { saveSetting: updateSetting } = useSettingStore();

  useEffect(() => {
    getAllOrg().then((res) => {
      const { data, status } = res;
      console.log({ data, status });
      if (status === 200 && data) {
        addOrgs(data);
        console.log({ getAllOrg: data });
      }
    });
  }, []);

  useEffect(() => {
    getSetting()
      .then((res) => {
        const { data, status } = res;
        console.log({ data, status });
        if (status === 200) {
          updateSetting(data);
          console.log({ settingData: data });
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Header></Header>
      <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-teal-50 dark:bg-white ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
