import React from "react";
import ItemSavedImage from "~/component/LeftBar/ItemSavedImage.tsx"; // Import icons


const SavedImage: React.FC<{ updateViewHistory: (status: boolean) => void }> = ({ updateViewHistory }) => {
    return (
        <div className="p-4 min-h-screen-minus-4rem bg-white shadow-md rounded-lg max-w-lg">
            <div className="mb-4 flex justify-between">
                <h2 className="text-lg font-semibold">Các ảnh quét đã lưu</h2>
                <button className="text-sm hover:bg-gray-300 w-7 h-7 rounded-[50%]" onClick={() => updateViewHistory(false)}>X
                </button>
            </div>
            {/*<div className="mb-4 flex justify-end">*/}
            {/*    <button className="text-blue-600 text-sm">Xóa toàn bộ các bản dịch đã thực hiện</button>*/}
            {/*</div>*/}
            <ItemSavedImage/>
            {/*<ItemHistoryTranslate/>*/}
            {/*<div className="bg-gray-100 p-4 rounded-lg mb-4">*/}
            {/*    <div className="flex justify-between items-center">*/}
            {/*        <h3 className="text-md font-semibold align-middle">Anh → Việt</h3>*/}
            {/*        <div className="flex">*/}
            {/*            <button*/}
            {/*                className="text-gray-400 text-md font-semibold hover:text-yellow-500 focus:outline-none">*/}
            {/*                <FaStar/>*/}
            {/*            </button>*/}
            {/*            /!* More Options (Three Dots) *!/*/}
            {/*            <button className="text-gray-400 text-md font-semibold hover:text-gray-600 focus:outline-none">*/}
            {/*                <FaEllipsisV/>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        /!* Favorite Star *!/*/}

            {/*    </div>*/}

            {/*    <p className="text-sm">*/}
            {/*        <strong>Platform:</strong> Platform defines what platform the chatbot works on, and the list may not*/}
            {/*        include all platforms. 🖥 Website Interfaces on a desktop and mobile website 📱 Facebook ...*/}
            {/*    </p>*/}
            {/*    <p className="text-sm mt-2">*/}
            {/*        <strong>Nền tảng:</strong> Nền tảng xác định chatbot hoạt động trên nền tảng nào và danh sách có thể*/}
            {/*        không bao gồm tất cả các nền tảng. 🖥 Trang web Giao diện trên máy tính để bàn và thiết bị di động 📱*/}
            {/*        Facebook...*/}
            {/*    </p>*/}
            {/*</div>*/}
        </div>
    );
};

export default SavedImage;