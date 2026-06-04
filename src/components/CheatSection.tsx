import React from 'react';
import styles from './CheatSection.module.css';

interface CheatSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function CheatSection({title, children}: CheatSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>{title}</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
