"use client";

import styles from "./page.module.css";

import { useRedirecting } from "./lib/useRedirecting";

export default function Home() {
  useRedirecting();

  return <div className={styles.page}>Index Page</div>;
}
