import { Tab, TabList, TabPanel, Tabs as AriaTabs } from 'react-aria-components';
import type { TabsProps } from '@valencesoftwareio/types';
import styles from './Tabs.module.css';

export const Tabs = ({ options, value, onChange, label }: TabsProps) => {
  return (
    <AriaTabs
      className={styles.tabs}
      selectedKey={value}
      onSelectionChange={(key) => onChange?.(String(key))}
    >
      <TabList className={styles.list} aria-label={label}>
        {options.map((option) => (
          <Tab
            id={option.value}
            key={option.value}
            className={styles.tab}
            isDisabled={option.disabled || !onChange}
          >
            {option.label}
          </Tab>
        ))}
      </TabList>
      {options.map((option) => (
        <TabPanel id={option.value} key={option.value} className={styles.panel}>
          {option.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
};
