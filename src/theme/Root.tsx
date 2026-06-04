import React from 'react';
import {DepthProvider} from '@site/src/context/DepthContext';

export default function Root({children}: {children: React.ReactNode}) {
  return <DepthProvider>{children}</DepthProvider>;
}
