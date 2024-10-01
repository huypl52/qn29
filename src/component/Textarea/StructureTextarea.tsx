import BaseTextarea from "./BaseTextarea";
import { IStructureTextarea } from "./type";

const StructureTextarea = (props: IStructureTextarea) => {
  const { header: Header, footer: Footer, ...args } = props;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
      {Header ? <Header /> : null}
      <BaseTextarea {...args} />
      {Footer ? <Footer /> : null}
    </div>
  );
};

export default StructureTextarea;
