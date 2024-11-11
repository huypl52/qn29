import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ISetting } from '~/type/setting';
import { getSetting, updateSetting } from '~/service/setting';
import { useSettingStore } from '~/store/setting';
import { toast } from 'react-toastify';
import { toastMsg } from '~/type';

const validationSchema = Yup.object().shape({
  image_max_size: Yup.number()
    .required('Vui lòng nhập kích thước ảnh tối đa')
    .positive('Phải là số dương')
    .test('max-size', 'Phải lớn hơn kích thước tối thiểu', function (value) {
      const minSize = Number(this.parent.image_min_size);
      return !value || !minSize || value > minSize;
    }),
  image_min_size: Yup.number()
    .required('Vui lòng nhập kích thước ảnh tối thiểu')
    .positive('Phải là số dương'),
  document_max_length: Yup.number()
    .required('Vui lòng nhập độ dài văn bản tối đa')
    .positive('Phải là số dương')
    .max(10000, 'Kích thước chữ không được vượt quá 100'),
  translate_timeout: Yup.number()
    .required('Vui lòng nhập thời gian chờ dịch')
    .min(0, 'Thời gian chờ không được âm')
    .max(3600, 'Thời gian chờ không được vượt quá 3600 giây'),
  image_queue_limit: Yup.number()
    .required('Vui lòng nhập số ảnh tối đa chờ xử lý')
    .min(0, 'Số ảnh không được âm'),
});

interface ISettingForm {
  value?: ISetting;
}

const SettingForm: React.FC<ISettingForm> = ({ value }: ISettingForm) => {
  const { saveSetting } = useSettingStore();
  const initialValues: ISetting = value
    ? value
    : {
        image_max_size: 0,
        image_min_size: 0,
        document_max_length: 0,
        translate_timeout: 0,
        image_queue_limit: 10,
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log({ values });
      saveSetting(values);
      updateSetting(values)
        .then((res) => {
          const { status, data } = res;
          if (status === 200) {
            toast.success(toastMsg.success);
          }
        })
        .catch((err) => {
          toast.error(err?.data ? err.data : toastMsg.error);
        });
      console.log('Settings updated:', values);
    },
    enableReinitialize: true, // This ensures the form updates if props change
  });

  console.log(formik.errors);

  return (
    <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Cài đặt thông số
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="image_max_size"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kích thước ảnh tải lên tối đa (MB):
          </label>
          <input
            type="number"
            id="image_max_size"
            name="image_max_size"
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.image_max_size}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.image_max_size && formik.errors.image_max_size && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.image_max_size}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="image_min_size"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kích thước ảnh tải lên tối thiểu (MB):
          </label>
          <input
            type="number"
            id="image_min_size"
            name="image_min_size"
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.image_min_size}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.image_min_size && formik.errors.image_min_size && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.image_min_size}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="document_max_length"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Độ dài văn bản nhập (Số ký tự):
          </label>
          <input
            type="number"
            id="document_max_length"
            name="document_max_length"
            onChange={formik.handleChange}
            value={formik.values.document_max_length}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.document_max_length &&
            formik.errors.document_max_length && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.document_max_length}
              </div>
            )}
        </div>

        <div>
          <label
            htmlFor="translate_timeout"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Thời gian dịch tối đa (giây):
          </label>
          <input
            type="number"
            id="translate_timeout"
            name="translate_timeout"
            onChange={formik.handleChange}
            value={formik.values.translate_timeout}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.translate_timeout &&
            formik.errors.translate_timeout && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.translate_timeout}
              </div>
            )}
        </div>

        <div>
          <label
            htmlFor="image_queue_limit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Số ảnh tối đa chờ xử lý
          </label>
          <input
            type="number"
            id="image_queue_limit"
            name="image_queue_limit"
            onChange={formik.handleChange}
            value={formik.values.image_queue_limit}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.image_queue_limit &&
            formik.errors.image_queue_limit && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.image_queue_limit}
              </div>
            )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Lưu cài đặt
          </button>
        </div>
      </form>
    </div>
  );
};

const Setting: React.FC = () => {
  // const [setting, updateSetting] = useState<ISetting>();
  //
  // useEffect(() => {
  //   getSetting()
  //     .then((res) => {
  //       const { data, status } = res;
  //       if (status === 200) {
  //         updateSetting(data);
  //         console.log({ settingData: data });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }, []);

  const { setting } = useSettingStore();
  return <SettingForm value={setting} />;
};
export default Setting;
