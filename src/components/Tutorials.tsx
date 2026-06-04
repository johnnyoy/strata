import React from 'react';
import styles from './Tutorials.module.css';

interface TutorialLink {
  label: string;
  url: string;
}

interface TutorialsProps {
  links: TutorialLink[];
}

export default function Tutorials({links}: TutorialsProps) {
  if (!links || links.length === 0) return null;
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <span className={styles.icon}>→</span>
        Go deeper
      </div>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
