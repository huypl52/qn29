import { FaCheckSquare, FaMinusSquare, FaSquare } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';
import TreeView, { flattenTree } from 'react-accessible-treeview';
import cx from 'classnames';
import './styles.css';

export type ITreeNode = Parameters<typeof flattenTree>[0];

// export type ITreeNode = {
//   id: string | number;
//   name: string;
//   children: string[];
//   parent: string;
//   isBranch: boolean;
//   metadata?: any;
// };

interface IUnitTree {
  data: ITreeNode;
}

function Tree({ data }: IUnitTree) {
  return (
    <div>
      <div className="checkbox">
        <TreeView
          // data={data}
          data={flattenTree(data)}
          aria-label="Single select"
          multiSelect={false}
          propagateSelectUpwards
          togglableSelect
          nodeAction="check"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            isSelected,
            isHalfSelected,
            getNodeProps,
            level,
            handleSelect,
            handleExpand,
          }) => {
            return (
              <div
                {...getNodeProps({ onClick: handleExpand })}
                className="flex items-center"
                style={{ marginLeft: 40 * (level - 1) }}
              >
                {isBranch && <ArrowIcon isOpen={isExpanded} />}
                <CheckBoxIcon
                  className="checkbox-icon"
                  onClick={(e) => {
                    handleSelect(e);
                    e.stopPropagation();
                  }}
                  variant={
                    isHalfSelected ? 'some' : isSelected ? 'all' : 'none'
                  }
                />
                <span className="name">{element.name}</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

interface IArrowIcon {
  isOpen: boolean;
  className?: string;
}

const ArrowIcon = ({ isOpen, className }: IArrowIcon) => {
  const baseClass = 'arrow';
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

interface ICheckBoxIcon {
  variant: 'all' | 'none' | 'some';
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const CheckBoxIcon = ({ variant, ...rest }: ICheckBoxIcon) => {
  switch (variant) {
    case 'all':
      return <FaCheckSquare {...rest} />;
    case 'none':
      return <FaSquare {...rest} />;
    case 'some':
      return <FaMinusSquare {...rest} />;
    default:
      return null;
  }
};

export default Tree;
