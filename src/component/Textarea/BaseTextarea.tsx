import { IBaseTextarea } from "./type";

const BaseTextarea = (props: IBaseTextarea) => {
  const { value, onChange, disabled } = props;
  return (
    <div>
      <textarea
        id="OrderNotes"
        className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
        rows={4}
        placeholder="Enter any additional order notes..."
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
      </textarea>
    </div>
  );
};

export default BaseTextarea;
