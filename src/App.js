import React from 'react';
import BasicLayout from "./components/common/layout/BasicLayout";
import styles from './App.less';

export default function App() {
    return (
        <BasicLayout>
            <div className={styles.container}>hello world</div>
        </BasicLayout>
    )
}
