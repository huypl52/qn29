interface Props {
  minRightWidth?: number;
  maxRightWidth?: number;
  initialRightWidth?: number;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  startWidth: number;
}

import React, { useCallback, useEffect, useRef, useState } from 'react';

const ResizableFlexContainer: React.FC<Props> = ({
  minRightWidth = 100,
  maxRightWidth = 800,
  initialRightWidth = 200,
  leftContent = 'Left Content',
  rightContent,
  className = '',
}) => {
  const [rightItemWidth, setRightItemWidth] = useState(
    rightContent ? initialRightWidth : 0
  );
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startWidth: initialRightWidth,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragState({
        isDragging: true,
        startX: e.clientX,
        startWidth: rightItemWidth,
      });
    },
    [rightItemWidth]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = dragState.startX - e.clientX;
      const newWidth = dragState.startWidth + deltaX;

      const maxContainerWidth = containerRect.width - 200;
      const effectiveMaxWidth = Math.min(maxRightWidth, maxContainerWidth);
      const clampedWidth = Math.min(
        Math.max(newWidth, minRightWidth),
        effectiveMaxWidth
      );
      setRightItemWidth(clampedWidth);
    },
    [dragState, minRightWidth, maxRightWidth]
  );

  const handleMouseUp = useCallback(() => {
    setDragState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex relative bg-gray-100 rounded-lg overflow-hidden ${className}`}
    >
      {/* Left item */}
      <div className="flex-1 p-4">{leftContent}</div>

      {/* Only render resize handle and right content if rightContent is provided */}
      {rightContent && (
        <>
          {/* Draggable resize handle */}
          <div
            className={`w-1 cursor-col-resize hover:bg-blue-400 active:bg-blue-600 ${
              dragState.isDragging ? 'bg-blue-600' : 'bg-blue-300'
            }`}
            onMouseDown={handleMouseDown}
          />

          {/* Right item with dynamic width */}
          <div className=" p-4" style={{ width: `${rightItemWidth}px` }}>
            {rightContent}
          </div>
        </>
      )}
    </div>
  );
};

export default ResizableFlexContainer;
