import React from 'react';
import styles from './Tabs.module.scss';

interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
    count?: number;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                        <span className={styles.tabCount}>{tab.count}</span>
                    )}
                </button>
            ))}
        </div>
    );
};