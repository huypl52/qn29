import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { FiFilter } from 'react-icons/fi';
import { useTaskStore } from '~/store/task';
import { listTaskTypeOcr } from '~/type/task';
import { ISearchParam } from '~/type/report';

const validationSchema = Yup.object({
  from_date: Yup.date().max(
    Yup.ref('to_date'),
    'Start date must be before end date'
  ),
  to_date: Yup.date().min(
    Yup.ref('from_date'),
    'End date must be after start date'
  ),
  file_name: Yup.string(),
  ocr_text: Yup.string(),
  source_text: Yup.string(),
  dest_text: Yup.string(),
});

interface FilterFormProps {
  onSubmit: (values: ISearchParam) => void;
  initialValues?: ISearchParam;
}

const SearchFilter: React.FC<FilterFormProps> = ({
  onSubmit,
  initialValues,
}) => {
  const [open, setOpen] = React.useState(false);
  const { type: taskType } = useTaskStore();
  const hasOcr = listTaskTypeOcr.includes(taskType);
  const formik = useFormik({
    initialValues: initialValues || {
      from_date: '',
      to_date: '',
      file_name: '',
      ocr_text: '',
      source_text: '',
      dest_text: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      setOpen(false);
      resetForm({});
    },
  });

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white  rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <FiFilter size={16} color="blue" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-80 p-4 bg-white rounded-lg shadow-lg border border-gray-200"
          sideOffset={5}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Thời gian
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="from_date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.from_date}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="date"
                  name="to_date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.to_date}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {(formik.touched.from_date && formik.errors.from_date) ||
              (formik.touched.to_date && formik.errors.to_date) ? (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.from_date || formik.errors.to_date}
                </div>
              ) : null}
            </div>

            {hasOcr && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên file
                </label>
                <input
                  type="text"
                  name="file_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.file_name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            {hasOcr && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Văn bản nhận diện
                </label>
                <input
                  type="text"
                  name="ocr_text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ocr_text}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Văn bản dịch nguồn
              </label>
              <input
                type="text"
                name="source_text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.source_text}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Văn bản dịch đích
              </label>
              <input
                type="text"
                name="dest_text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dest_text}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Popover.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onSubmit({})}
                >
                  Hủy
                </button>
              </Popover.Close>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Thực hiện
              </button>
            </div>
          </form>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default SearchFilter;
