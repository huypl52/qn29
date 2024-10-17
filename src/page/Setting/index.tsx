import React, { useState } from 'react';

const Setting: React.FC = () => {
  const [formData, setFormData] = useState({
    maxImageSize: '',
    minImageSize: '',
    textSize: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form after submission (optional)
    setFormData({
      maxImageSize: '',
      minImageSize: '',
      textSize: '',
      password: '',
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Cài đặt thông số
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block mb-2" htmlFor="maxImageSize">
            Kích thước ảnh tải lên tối đa (MB):
          </label>
          <input
            type="number"
            id="maxImageSize"
            name="maxImageSize"
            value={formData.maxImageSize}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="minImageSize">
            Kích thước ảnh tải lên tối thiểu (MB):
          </label>
          <input
            type="number"
            id="minImageSize"
            name="minImageSize"
            value={formData.minImageSize}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="textSize">
            Kích thước văn bản nhập:
          </label>
          <input
            type="number"
            id="textSize"
            name="textSize"
            value={formData.textSize}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="password">
            Đổi mật khẩu:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Lưu Cài đặt
        </button>
      </form>
    </div>
  );
};

export default Setting;
