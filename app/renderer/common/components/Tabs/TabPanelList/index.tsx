import React, { useContext } from "react";
import classNames from "classnames";
import TabContext from '@common/components/Tabs/TabContext';
import type { Tab } from '@common/components/Tabs/interface';

export interface TabPanelListProps {
    activeKey: React.Key;
    id: string;
}

function TabPanelList(
    {
        id,
        activeKey
    }: TabPanelListProps
) {
    const { prefixCls, tabs } = useContext(TabContext);

    return (
        <div className={classNames(`${prefixCls}-content-holder`)}>
            <div
                className={`${prefixCls}-content`}
            >
                {
                    tabs.map((tab: Tab) => {
                        return React.cloneElement(tab.node, {
                            key: tab.key,
                            prefixCls,
                            tabKey: tab.key,
                            id,
                            active: tab.key === activeKey,
                        });
                    })
                }
            </div>
        </div>
    )

}

export default TabPanelList;
