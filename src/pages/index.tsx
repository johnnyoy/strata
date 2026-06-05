import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const TOPICS = [
  {
    name: 'Git',
    path: '/docs/git',
    icon: '⎇',
    desc: 'Branching, commits, rebase, and collaborating with remotes.',
  },
  {
    name: 'Docker',
    path: '/docs/docker',
    icon: '🐳',
    desc: 'Containers, images, Dockerfiles, and multi-service networking.',
  },
  {
    name: 'Linux',
    path: '/docs/linux',
    icon: '🐧',
    desc: 'Permissions, processes, the shell, and system internals.',
  },
  {
    name: 'JavaScript',
    path: '/docs/javascript',
    icon: 'JS',
    desc: 'Async/await, the event loop, closures, and modern patterns.',
  },
  {
    name: 'SQL',
    path: '/docs/sql',
    icon: '⊏⊐',
    desc: 'Queries, joins, indexes, window functions, and transactions.',
  },
  {
    name: 'Kubectl',
    path: '/docs/kubectl',
    icon: '☸',
    desc: 'Kubernetes CLI — contexts, workloads, logs, exec, and debugging.',
  },
  {
    name: 'AKS',
    path: '/docs/aks',
    icon: 'Az',
    desc: 'Azure Kubernetes Service — clusters, node pools, ingress, and storage.',
  },
  {
    name: 'Flux',
    path: '/docs/flux',
    icon: '⟳',
    desc: 'GitOps with Flux — sync your cluster state from a Git repository.',
  },
  {
    name: 'CLI Commands',
    path: '/docs/cli',
    icon: '$_',
    desc: 'grep, vim, htop — the essential command-line tools explained.',
  },
  {
    name: 'Terraform',
    path: '/docs/terraform',
    icon: 'tf',
    desc: 'Infrastructure as code — providers, resources, state, and modules.',
  },
  {
    name: 'Python',
    path: '/docs/python',
    icon: '🐍',
    desc: 'Data structures, comprehensions, async, and the standard library.',
  },
  {
    name: 'GitHub Actions',
    path: '/docs/github-actions',
    icon: 'CI',
    desc: 'CI/CD workflows — triggers, jobs, matrix builds, and reusable actions.',
  },
  {
    name: 'Helm',
    path: '/docs/helm',
    icon: '⎈',
    desc: 'Kubernetes package manager — charts, templating, and release lifecycle.',
  },
  {
    name: 'TypeScript',
    path: '/docs/typescript',
    icon: 'TS',
    desc: 'Static types for JavaScript — generics, utility types, and strict patterns.',
  },
  {
    name: 'Go',
    path: '/docs/go',
    icon: 'Go',
    desc: 'Concurrency, interfaces, and the toolchain behind Kubernetes and Docker.',
  },
  {
    name: 'Bash',
    path: '/docs/bash',
    icon: '$>',
    desc: 'Shell scripting — variables, text processing, and CI/CD automation.',
  },
  {
    name: 'OpenTelemetry',
    path: '/docs/opentelemetry',
    icon: '🔭',
    desc: 'Distributed tracing, metrics, and logs — the CNCF observability standard.',
  },
];

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.badge}>Short · Medium · Long</div>
        <h1 className={styles.heroTitle}>
          Docs at the depth<br />you choose.
        </h1>
        <p className={styles.heroSubtitle}>
          Strata is a technical reference where every topic has three levels of
          detail. Toggle between <strong>short</strong> (quick reminder),{' '}
          <strong>medium</strong> (practical guide), or <strong>long</strong>{' '}
          (full deep-dive) — site-wide, instantly.
        </p>
        <div className={styles.heroCta}>
          <Link className="button button--primary button--lg" to="/docs/git">
            Browse topics
          </Link>
          <Link className="button button--outline button--lg" to="/docs/about">
            How depth works
          </Link>
        </div>
      </div>
    </div>
  );
}

function TopicCard({name, path, icon, desc}: (typeof TOPICS)[0]) {
  return (
    <Link to={path} className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div>
        <div className={styles.cardName}>{name}</div>
        <div className={styles.cardDesc}>{desc}</div>
      </div>
    </Link>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main className={styles.main}>
        <section className={styles.topicsSection}>
          <h2 className={styles.sectionTitle}>Topics</h2>
          <div className={styles.grid}>
            {TOPICS.map((t) => (
              <TopicCard key={t.name} {...t} />
            ))}
          </div>
        </section>

        <section className={styles.depthSection}>
          <div className={styles.depthBox}>
            <h2 className={styles.depthTitle}>One toggle. Every page.</h2>
            <p>
              Use the <strong>short / medium / long</strong> toggle in the top
              navbar to control how much detail you see across the whole site.
              Your choice is saved — so next time you visit, Strata opens at the
              same depth.
            </p>
            <div className={styles.depthExamples}>
              <div className={styles.depthExample}>
                <span className={styles.depthLabel}>short</span>
                <span>TL;DR — the commands or concept at a glance.</span>
              </div>
              <div className={styles.depthExample}>
                <span className={styles.depthLabel}>medium</span>
                <span>Practical explanation with real examples.</span>
              </div>
              <div className={styles.depthExample}>
                <span className={styles.depthLabel}>long</span>
                <span>Full deep-dive: internals, edge cases, gotchas.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
