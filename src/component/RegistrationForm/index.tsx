import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import TreeUnit from '~/feature/unit';
import { registerUser } from '~/service/user';
import { toastMsg } from '~/type';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface UserFormValues {
  name: string;
  orgid: string;
  username: string;
  password: string;
}

const initialValues: UserFormValues = {
  name: '',
  orgid: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Tên đăng nhập không được chứa ký tự đặc biệt')
    .required('Xin mời nhập tên đăng nhập'),
  password: Yup.string()
    .min(6, 'Mật khẩu yêu cầu tối thiểu 6 ký tự')
    .required('Xin mời nhập mật khẩu'),
  name: Yup.string().required('Xin mời nhập tên'),
  orgid: Yup.string().required('Xin một chọn đơn vị'),
});

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form values:', values);
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);

      const { username, name, password, orgid } = values;
      if (!orgid) {
        toast.error('Vui lòng chọn 1 đơn vị');
        return;
      }

      setTimeout(
        () =>
          registerUser({ username, fullname: name, password, orgid })
            .then((res) => {
              const { status, data } = res;
              if (status !== 200) {
                throw new Error();
              }
              toast.success(toastMsg.success);
            })
            .catch((error) => {
              error?.data
                ? toast.error(error.data)
                : toast.error(toastMsg.error);
            })
            .finally(() => setSubmitting(false)),
        2000
      );
    },
  });

  return (
    <div className=" flex items-center justify-center h-full w-full">
      <div className="bg-gray-100 rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">Đăng Ký</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            {formik.errors.name || null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Tên người dùng
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            {formik.errors.username}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            {formik.errors.password || null}
          </div>
          <div className="mb-4">
            <TreeUnit
              onNodeSelect={(v) => {
                const {
                  element: { id },
                  isSelected,
                } = v;
                if (isSelected) formik.setFieldValue('orgid', id as string);
                else formik.setFieldValue('orgid', '');
              }}
            />
            {formik.errors.orgid || null}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {formik.isSubmitting ? 'Đang thực hiện' : 'Đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
