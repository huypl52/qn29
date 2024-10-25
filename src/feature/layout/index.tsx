import { useState, useEffect } from 'react';
import { RiTranslate2 } from 'react-icons/ri';
import { LuSettings2 } from "react-icons/lu";
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import { Outlet } from 'react-router-dom';
import logoImage from '~/assets/logo.png';
import TextSwitch from '~/component/Switch';
import { AuthRoutePath } from '~/routes';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
            {/* <MdOutlineStorage size={20} /> */}

            <img
              src={logoImage}
              alt="logo"
              className="object-cover w-32 md:w-48 lg:w-64 rounded-full"
            />
          </button>

          <div className="ml-2 my-auto text-3xl font-semibold text-white dark:text-black">
            PHẦN MỀM DỊCH NGÔN NGỮ PHỤC VỤ TRINH SÁT, GIÁM SÁT TRÊN KGM
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>

      <div className="flex items-center">
        <div className={darkMode ? 'dark' : ''}>
          <div
            onClick={toggleDarkMode}
            className="mr-2 h-[1vw] w-[1vw] bg-white dark:bg-[#CFCFB6] text-black dark:text-white"
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
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleNavigation('/statistical')}
                  >
                    Thống kê
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => handleNavigation('/setting')}
                  >
                    Cài đặt
                  </button>
                </li>
                <li>
                  <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
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
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Header></Header>
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat bg-[#CFCFB6]
 dark:bg-white " // style={{
        //   backgroundImage: "url('/src/assets/background.jpeg')",
        //   backgroundColor: 'rgba(0, 0, 0, 0.25)',
        // }}
        //style={{ backgroundColor: '#CFCFB6' }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
