import React, { useRef } from 'react';

const SHOW_RENDER_COUNTERS = true;
const isDev = process.env.NODE_ENV === 'development';

const useRenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  if (isDev && SHOW_RENDER_COUNTERS) {
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
          width: 35,
        }}
      >{String(renderCount.current)}</p>
    );
  }
  return null;
};

export default useRenderCounter;
