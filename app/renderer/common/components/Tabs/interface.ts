import type { TabPaneProps } from './TabPanelList/TabPane';

export interface Tab extends TabPaneProps {
    key: string;
    node: React.ReactElement<TabPaneProps>;
}
