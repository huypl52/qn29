import { FaCheckSquare, FaMinusSquare, FaSquare } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';
import TreeView, {
  flattenTree,
  ITreeViewOnSelectProps,
} from 'react-accessible-treeview';
import cx from 'classnames';
import './styles.css';
import { ITree } from './type';
import { useEffect, useState } from 'react';

function Tree({
  data,
  selectedIds,
  onNodeSelect,
  disabledIds: defaultDisabledIds,
}: ITree) {
  const [disabledIds, setDisabledIds] = useState<string[] | undefined>(
    defaultDisabledIds
  );

  useEffect(() => {
    setDisabledIds(defaultDisabledIds);
  }, [defaultDisabledIds]);

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
          selectedIds={selectedIds}
          onNodeSelect={onNodeSelect}
          // onSelect={(v) => {
          //   console.log({
          //     onSelect: v,
          //   });
          // }}
          defaultDisabledIds={disabledIds}
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
                className={`flex items-center ${
                  disabledIds?.includes(element.id as string)
                    ? 'opacity-70'
                    : ''
                }`}
                style={{ marginLeft: 40 * (level - 1) }}
              >
                {isBranch ? (
                  <ArrowIcon isOpen={isExpanded} />
                ) : (
                  <div className="invisible">
                    <ArrowIcon isOpen />
                  </div>
                )}
                {/* {isBranch && <ArrowIcon isOpen={isExpanded} />} */}
                {/* {<ArrowIcon isOpen={isBranch && isExpanded} />} */}
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
  disabled?: boolean;
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
