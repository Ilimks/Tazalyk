'use client';
import { Loading } from '../Loading';
import styles from './FullPageLoader.module.scss';

export const FullPageLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Loading/>
    </div>
  );
};