import BaseTextarea from "./BaseTextarea";
import { IStructureTextarea } from "./type";

const StructureTextarea = (props: IStructureTextarea) => {
  const { header: Header, footer: Footer, disabled, ...args } = props;

  let className =
    '"overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"';
  if (disabled) {
    className += " bg-gray-200";
  }
  return (
    <div className={className}>
      {Header ? (
        <div className="p-2">
          <Header />
        </div>
      ) : null}
      <BaseTextarea {...args} disabled={disabled} />
      {Footer ? (
        <div className="p-2">
          <Footer />
        </div>
      ) : null}
    </div>
  );
};

export default StructureTextarea;
