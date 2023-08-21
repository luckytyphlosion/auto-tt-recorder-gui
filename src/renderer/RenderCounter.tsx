import React, { useRef } from 'react';

const SHOW_RENDER_COUNTERS = true;
const isDev = process.env.NODE_ENV === 'development';

const useRenderCounter = (disabled?: boolean, name?: string) => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  if (isDev && SHOW_RENDER_COUNTERS && !disabled) {
    return (
      <p
        style={{
          backgroundColor: 'hsl(0, 100%, 50%)',
          borderRadius: 6,
          color: 'hsl(0, 0%, 100%)',
          fontSize: 10,
          fontWeight: 'bold',
          height: 35,
          margin: 2,
          textAlign: 'center',
          width: "fit-content",
          minWidth: 35,
          padding: 2
        }}
      >{name !== undefined ? `${name}: ` : ""}{String(renderCount.current)}</p>
    );
  }
  return null;
};

export default useRenderCounter;
