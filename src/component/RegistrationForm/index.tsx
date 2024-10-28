import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUser } from '~/service/user';
import { toastMsg } from '~/type';

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [detail, setDetail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Thực hiện xử lý form ở đây
    console.log('Submitted:', { name, username, password, detail });

    registerUser({ username, fullname: name, password, orgid: detail })
      .then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          throw new Error();
        }
        toast.success(toastMsg.success);
      })
      .catch((error) => {
        error?.data ? toast.error(error.data) : toast.error(toastMsg.error);
      });
  };

  return (
    <div className=" flex items-center justify-center h-full w-full">
      <div className="bg-gray-100 rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Chi tiết</label>
            <select
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Chọn đơn vị</option>
              <option value="T1">T1</option>
              <option value="T5">T5</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

