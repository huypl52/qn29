import { Outlet } from 'react-router-dom';
import { MdOutlineStorage } from 'react-icons/md';
import { RiTranslate2 } from 'react-icons/ri';
const Header = () => {
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
        <div className="flex">
          <button
            className="hover:bg-gray-100 rounded-full 
            w-9 h-9 mt-1 mr-2
            transition-colors duration-100"
            x-on:click="appsIsOpen = !appsIsOpen; appsPopupIsActive = appsIsOpen"
          >
            <i className="mdi mdi-apps text-gray-500"></i>
          </button>

          <button className="m-1">
            <div className="object-cover w-9 h-9 rounded-full border shado flex justify-center items-center">
              <RiTranslate2 size={24} />
            </div>
          </button>
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
