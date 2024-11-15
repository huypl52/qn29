import React, { ReactNode, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import TreeUnit from '~/feature/unit/TreeUnit';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserRole } from '~/storage/auth';
import { ERole, IUser } from '~/type/user';

interface IFormUser extends Partial<IUser> {}

const placeholderValues: IFormUser = {
  id: '',
  fullname: '',
  orgid: '',
  username: '',
  password: '',
  role: ERole.user,
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập không được chứa ký tự đặc biệt')
    .required('Xin mời nhập tên đăng nhập'),
  password: Yup.string()
    .min(6, 'Mật khẩu yêu cầu tối thiểu 6 ký tự')
    .required('Xin mời nhập mật khẩu'),
  fullname: Yup.string().required('Xin mời nhập tên'),
  orgid: Yup.string().required('Xin một chọn đơn vị'),
});

interface IUserForm {
  onClose?: () => void;
  onSubmit: (user: Partial<IUser>) => Promise<boolean>;
  initValue?: IFormUser;
  footer?: ReactNode;
  readonly?: boolean;
  title?: ReactNode;
}

interface IFormSubmit {
  submit: () => void;
}

const UserForm = React.forwardRef<IFormSubmit, IUserForm>(
  (
    {
      onClose,
      onSubmit,
      initValue,
      readonly,
      footer: Footer,
      title: Title,
    }: IUserForm,
    ref
  ) => {
    const initialValues = initValue ? initValue : placeholderValues;
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, { setSubmitting }) => {
        console.log('Form values:', values);
        setTimeout(() => {
          setSubmitting(false);
        }, 3000);

        const { username, fullname, password, orgid } = values;
        if (!orgid) {
          toast.error('Vui lòng chọn 1 đơn vị');
          return;
        }

        // const submitValues = { username, fullname, password, orgid } as IUser;
        // console.log({ submitValues });
        setTimeout(() => onSubmit(values), 2000);
      },
      enableReinitialize: true,
    });

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          return formik.submitForm();
        },
      })
      // [formik]
    );

    const userRole = getUserRole();

    return (
      <div className=" flex items-center justify-center h-full w-full">
        <div className="bg-gray-100 rounded-lg p-6 w-96 shadow-lg relative">
          {Title ? Title : <h2 className="text-2xl font-bold mb-4">Đăng Ký</h2>}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                disabled={readonly}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              {formik.errors.fullname && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.fullname}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Tên người dùng
              </label>
              <input
                type="text"
                id="username"
                name="username"
                disabled={readonly}
                value={formik.values.username}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                disabled={readonly}
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              {formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Quyền</label>

              <select
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded"
              >
                {Object.entries(ERole)
                  .filter(
                    ([key, value]) =>
                      parseInt(value) <=
                      parseInt(userRole?.valueOf().toString() || '1')
                  )
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([key, value]) => (
                    <option key={value} value={value}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>
                  ))}
              </select>
              {/* {formik.touched.role && formik.errors.role && ( */}
              {/*   <div className="text-red-500 text-sm mt-1"> */}
              {/*     {formik.errors.role} */}
              {/*   </div> */}
              {/* )} */}
            </div>

            {
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Đơn vị</label>
                <TreeUnit
                  onNodeSelect={(v) => {
                    const {
                      element: { id },
                      isSelected,
                    } = v;
                    if (isSelected) formik.setFieldValue('orgid', id as string);
                    else formik.setFieldValue('orgid', '');
                  }}
                  selectedIds={formik.values.orgid ? [formik.values.orgid] : []}
                />
                {formik.errors.orgid && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.orgid}
                  </div>
                )}
              </div>
            }
            <div className="flex justify-end space-x-3">
              {Footer ? (
                Footer
              ) : (
                <button
                  type="button"
                  disabled={formik.isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => formik.submitForm()}
                >
                  {formik.isSubmitting ? 'Đang thực hiện' : 'Lưu'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default UserForm;
