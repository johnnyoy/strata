import React from 'react';
import {useDepth, type DepthLevel} from '@site/src/context/DepthContext';

interface LevelProps {
  show: DepthLevel;
  children: React.ReactNode;
}

export default function Level({show, children}: LevelProps) {
  const {level} = useDepth();
  return level === show ? <>{children}</> : null;
}
