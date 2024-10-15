import React from "react";
import { FaEllipsisV, FaStar, FaTrashAlt } from 'react-icons/fa'; // Import icons


const ItemHistoryItemOcr = () => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false); // State to track favorite status


    // Toggle the visibility of the dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Function to handle the delete action
    const handleDelete = () => {
        console.log("Data deleted");
        // Implement your data deletion logic here
        setShowDropdown(false); // Close the dropdown after deleting
    };

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev); // Toggle the favorite state
    };




    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <img className='h-[5rem] w-[8rem] object-fill mx-auto'
            src="../../assets/drag_and_drop.png" alt="noload"/>
            <div className="relative flex justify-between items-center">
                <h3 className="text-md font-semibold align-middle">Anh → Việt</h3>
                <div className="flex">
                    {/* Favorite Star */}
                    <button
                        className={`text-md font-semibold focus:outline-none text-center hover:text-yellow-500 ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`} // Change color based on state
                        onClick={toggleFavorite} // Toggle favorite status
                    ><FaStar/>
                    </button>

                    {/* More Options (Three Dots) */}
                    <button
                        className="text-gray-400 text-md font-semibold rounded-[50%] text-center hover:text-gray-600 focus:outline-none"
                        onClick={toggleDropdown} // Toggle dropdown visibility
                    >
                        <FaEllipsisV/>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute top-full right-0 mt-1 bg-white border shadow-md rounded-lg z-10 w-36">
                            <button
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                                onClick={handleDelete} // Handle delete action
                            >
                                <FaTrashAlt className="mr-2"/> Xóa
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Paragraphs */}
            <p className="text-sm mt-2 relative z-0">
                <strong>Platform:</strong> Platform defines what platform the chatbot works on, and the list may not
                include all platforms.
                🖥 Website Interfaces on a desktop and mobile website 📱 Facebook ...
            </p>
            <p className="text-sm mt-2 relative z-0">
                <strong>Nền tảng:</strong> Nền tảng xác định chatbot hoạt động trên nền tảng nào và danh sách có thể
                không bao gồm tất cả
                các nền tảng. 🖥 Trang web Giao diện trên máy tính để bàn và thiết bị di động 📱 Facebook...
            </p>
        </div>
    );
};

export default ItemHistoryItemOcr;