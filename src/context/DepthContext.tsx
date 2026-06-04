import React, {createContext, useContext, useEffect, useState} from 'react';

export type DepthLevel = 'short' | 'medium' | 'long';

interface DepthContextValue {
  level: DepthLevel;
  setLevel: (level: DepthLevel) => void;
  LEVELS: DepthLevel[];
}

const DepthContext = createContext<DepthContextValue | null>(null);
const LEVELS: DepthLevel[] = ['short', 'medium', 'long'];

export function DepthProvider({children}: {children: React.ReactNode}) {
  const [level, setLevelState] = useState<DepthLevel>('medium');

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('strata-depth');
    if (saved && LEVELS.includes(saved as DepthLevel)) {
      setLevelState(saved as DepthLevel);
    }
  }, []);

  const setLevel = (newLevel: DepthLevel) => {
    setLevelState(newLevel);
    if (typeof window !== 'undefined') {
      localStorage.setItem('strata-depth', newLevel);
    }
  };

  return (
    <DepthContext.Provider value={{level, setLevel, LEVELS}}>
      {children}
    </DepthContext.Provider>
  );
}

export function useDepth(): DepthContextValue {
  const ctx = useContext(DepthContext);
  if (!ctx) throw new Error('useDepth must be used within a DepthProvider');
  return ctx;
}
