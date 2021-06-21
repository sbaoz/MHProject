import { createContext } from 'react';
import type { Tab } from '@common/components/Tabs/interface';

export interface TabContextProps {
    tabs: Tab[],
    prefixCls: string
}

export default createContext<TabContextProps>(null);
