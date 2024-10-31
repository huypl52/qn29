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
    .matches(/^[a-zA-Z0-9]+$/, 'Username cannot contain special characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log('Form values:', values);
      // setTimeout(() => {
      //   setSubmitting(false);
      // }, 1000);

      const { username, name, password, orgid } = values;
      if (!orgid) {
        toast.error('Vui lòng chọn 1 đơn vị');
        return;
      }

      registerUser({ username, fullname: name, password, orgid })
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
          </div>
          <div className="mb-4">
            <TreeUnit
              onNodeSelect={(v) => {
                const {
                  element: { id },
                  isSelected,
                } = v;
                if (isSelected) formik.setFieldValue('orgid', id as string);
              }}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              // disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {formik.isSubmitting ? 'Đang thực hiện' : 'Đăng ký'}
            </button>
          </div>
          <button
            type="submit"
            // disabled={formik.isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {formik.isSubmitting ? 'Đang thực hiện' : 'Đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
