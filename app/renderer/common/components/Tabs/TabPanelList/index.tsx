import React, { useContext } from "react";
import classNames from "classnames";
import TabContext from '@common/components/Tabs/TabContext';
import type { AnimatedConfig } from '@common/components/Tabs/interface';

export interface TabPanelListProps {
    activeKey: React.Key;
    id: string;
    animated?: AnimatedConfig;
    destroyInactiveTabPane?: boolean;
}

function TabPanelList({
    id,
    activeKey,
    animated,
    destroyInactiveTabPane
  }: TabPanelListProps) {
    const { prefixCls, tabs } = useContext(TabContext);
    const tabPaneAnimated = animated?.tabPane;
    const activeIndex = tabs.findIndex(tab => tab.key === activeKey);

    return (
        <div className={classNames(`${prefixCls}-content-holder`)}>
            <div
                className={classNames(`${prefixCls}-content`, {
                    [`${prefixCls}-content-animated`]: tabPaneAnimated
                })}
                style={
                    activeIndex && tabPaneAnimated
                        ? {['marginRight']: `-${activeIndex}00%`}
                        : {}
                }
            >
                {
                    tabs.map(tab => {
                        return React.cloneElement(tab.node, {
                            key: tab.key,
                            prefixCls,
                            tabKey: tab.key,
                            id,
                            animated: tabPaneAnimated,
                            active: tab.key === activeKey,
                            destroyInactiveTabPane
                        });
                    })
                }
            </div>
        </div>
    )

}

export default TabPanelList;
