import { useState } from 'react';
import { MdOutlineStorage } from 'react-icons/md';
import { RiTranslate2 } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import { Outlet } from 'react-router-dom';


const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleNavigation = (path: string) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <header className="flex flex-grow px-5 py-2 border-b border-gray-200 w-full h-[20vh] max-h-16">
            <div className="flex-none">
                <div className="flex flex-grow mt-1">
                    <button
                        className="hover:bg-gray-100 rounded-full w-9 h-9 mr-2
            transition-colors duration-100 flex justify-center items-center"
                    >
                        <MdOutlineStorage size={20} />
                    </button>

                    <div className="ml-2 my-auto text-3xl font-semibold text-gray-700">
                        Phần mềm dịch ngôn ngữ phục vụ trinh sát, giám sát trên KGM
                    </div>
                </div>
            </div>

            <div className="flex-grow"></div>

            <div className="flex-none">
                <div className="relative">
                    <button
                        className="hover:bg-gray-100 rounded-full
            w-9 h-9 mt-1 mr-2 transition-colors duration-100 shado flex justify-center items-center"
                        onClick={toggleDropdown}
                    >
                        <RiTranslate2 size={24} />
                    </button>

                    {/* Dropdown */}
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <ul className="py-1">
                                <li>
                                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                            onClick={() => handleNavigation('/statistical')}
                                    >
                                        Thống kê
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
        <>
            <Header></Header>
            <div className="w-full h-full m-auto">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
