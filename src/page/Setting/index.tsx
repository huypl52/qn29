import React from 'react';

const Setting: React.FC = () => {
  const [maxImageSize, setMaxImageSize] = React.useState('');
  const [minImageSize, setMinImageSize] = React.useState('');
  const [textSize, setTextSize] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false); // Trạng thái hiển thị mật khẩu

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi dữ liệu ở đây
    console.log({
      maxImageSize,
      minImageSize,
      textSize,
      password,
    });
  };

  // Hàm kiểm tra và chỉ cho phép nhập số
  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    // Kiểm tra nếu giá trị là số hoặc rỗng
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Cài đặt thông số
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block mb-2" htmlFor="maxImageSize">
            Kích thước ảnh tải lên tối đa (MB):
          </label>
          <input
            type="text"
            value={maxImageSize}
            onChange={(e) => handleNumberInput(e, setMaxImageSize)}
            placeholder=""
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="minImageSize">
            Kích thước ảnh tải lên tối thiểu (MB):
          </label>
          <input
            type="text"
            value={minImageSize}
            onChange={(e) => handleNumberInput(e, setMinImageSize)}
            placeholder=""
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="textSize">
            Kích thước văn bản nhập:
          </label>
          <input
            type="text"
            value={textSize}
            onChange={(e) => handleNumberInput(e, setTextSize)}
            placeholder=""
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="password">
            Đổi mật khẩu:
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'} // Thay đổi type dựa trên trạng thái
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Đổi mật khẩu"
              className="border rounded px-3 py-2 flex-1"
              required
            />
            <label className="ml-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-1"
              />
              Xem mật khẩu
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          Lưu cài đặt
        </button>
      </form>
    </div>
  );
};

export default Setting;
