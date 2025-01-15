import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IPasswordUpdateValues } from '~/type/user';

const PasswordUpdateSchema = Yup.object().shape({
  old_password: Yup.string()
    .required('Vui lòng nhập mật khẩu hiện tại')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu mới')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .notOneOf(
      [Yup.ref('old_password')],
      'Mật khẩu mới phải khác mật khẩu hiện tại'
    ),
  password_confirmation: Yup.string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
});

interface IPasswordUpdateForm {
  onSubmit: (values: IPasswordUpdateValues) => Promise<void>;
}

const PasswordUpdatePage: React.FC<IPasswordUpdateForm> = ({
  onSubmit,
}: IPasswordUpdateForm) => {
  const formik = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    } as IPasswordUpdateValues,
    validationSchema: PasswordUpdateSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      onSubmit(values)
        .then(() => {
          setStatus({ success: 'Cập nhật mật khẩu thành công!' });
        })
        .catch(() =>
          setStatus({ error: 'Cập nhật mật khẩu thất bại. Vui lòng thử lại.' })
        )
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <div className=" flex items-center justify-center h-full w-full">
      <div className="bg-gray-100 rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">Cập nhật mật khẩu</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="old_password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.old_password}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                formik.touched.old_password && formik.errors.old_password
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.old_password && formik.errors.old_password && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.old_password}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300  ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="mt-1 text-sm text-red-600">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password_confirmation}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.password_confirmation &&
              formik.errors.password_confirmation && (
                <div className="mt-1 text-sm text-red-600">
                  {formik.errors.password_confirmation}
                </div>
              )}
          </div>

          {formik.status?.success && (
            <div className="text-sm text-green-600">
              {formik.status.success}
            </div>
          )}
          {formik.status?.error && (
            <div className="text-sm text-red-600">{formik.status.error}</div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {formik.isSubmitting ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdatePage;
