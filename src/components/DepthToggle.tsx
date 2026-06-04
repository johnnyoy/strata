import React from 'react';
import {useDepth} from '@site/src/context/DepthContext';
import styles from './DepthToggle.module.css';

export default function DepthToggle() {
  const {level, setLevel, LEVELS} = useDepth();
  return (
    <div className={styles.toggle}>
      {LEVELS.map((l) => (
        <button
          key={l}
          className={`${styles.btn} ${level === l ? styles.active : ''}`}
          onClick={() => setLevel(l)}
          aria-pressed={level === l}
          title={`Show ${l} detail`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
