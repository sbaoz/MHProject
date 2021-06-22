import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import TabContext from '@common/components/Tabs/TabContext';
import TabNavList from '@common/components/Tabs/TabNavList';
import TabPane from '@common/components/Tabs/TabPanelList/TabPane';
import TabPanelList from '@common/components/Tabs/TabPanelList';
import type {AnimatedConfig, Tab} from '@common/components/Tabs/interface';
import type {TabPaneProps} from '@common/components/Tabs/TabPanelList/TabPane';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    id?: string;
    activeKey?: string;
    defaultActiveKey?: string;
    animated?: boolean | AnimatedConfig;
    tabBarGutter?: number;
    tabBarStyle?: React.CSSProperties;
    destroyInactiveTabPane?: boolean;
    onChange?: (activeKey: string) => void;
    onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
}

function parseTabList(children: React.ReactNode): Tab[] {
    return toArray(children)
        .map((node: React.ReactElement<TabPaneProps>) => {
            if (React.isValidElement(node)) {
                const key = node.key !== undefined ? String(node.key) : undefined;
                return {
                    key,
                    ...node.props,
                    node,
                };
            }
            return null;
        })
        .filter(tab => tab);
}

let uuid = 0;

function Tabs(
    {
        id,
        prefixCls = 'rc-tabs',
        className,
        activeKey,
        defaultActiveKey,
        children,
        animated = {
            inkBar: true,
            tabPane: false,
        },
        tabBarGutter,
        tabBarStyle,
        destroyInactiveTabPane,
        onChange,
        onTabClick,
        ...restProps
    }: TabsProps,
    ref: React.Ref<HTMLDivElement>
    ) {
    const tabs = parseTabList(children);
    let mergedAnimated: AnimatedConfig | false;
    if (animated === false) {
        mergedAnimated = {
            inkBar: false,
            tabPane: false,
        };
    } else if (animated === true) {
        mergedAnimated = {
            inkBar: true,
            tabPane: true,
        };
    } else {
        mergedAnimated = {
            inkBar: true,
            tabPane: false,
            ...(typeof animated === 'object' ? animated : {}),
        };
    }

    const [mergedActiveKey, setMergedActiveKey] = useMergedState<string>(() => tabs[0]?.key, {
        value: activeKey,
        defaultValue: defaultActiveKey,
    });
    const [activeIndex, setActiveIndex] = useState(() =>
        tabs.findIndex(tab => tab.key === mergedActiveKey),
    );

    useEffect(() => {
        let newActiveIndex = tabs.findIndex(tab => tab.key === mergedActiveKey);
        if (newActiveIndex === -1) {
            newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
            setMergedActiveKey(tabs[newActiveIndex]?.key);
        }
        setActiveIndex(newActiveIndex);
    }, [tabs.map(tab => tab.key).join('_'), mergedActiveKey, activeIndex]);

    const [mergedId, setMergedId] = useMergedState(null, {
        value: id,
    });

    useEffect(() => {
        if (!id) {
            setMergedId(`rc-tabs-${process.env.NODE_ENV === 'test' ? 'test' : uuid}`);
            uuid += 1;
        }
    }, []);

    function onInternalTabClick(key: string, e: React.MouseEvent | React.KeyboardEvent) {
        onTabClick?.(key, e);

        setMergedActiveKey(key);
        onChange?.(key);
    }

    const sharedProps = {
        id: mergedId,
        activeKey: mergedActiveKey,
        animated: mergedAnimated
    };

    const tabNavBarProps = {
        ...sharedProps,
        tabBarGutter,
        onTabClick: onInternalTabClick,
        style: tabBarStyle,
        panes: children,
    };

    const tabNavBar: React.ReactElement = <TabNavList {...tabNavBarProps} />;

    return (
        <TabContext.Provider value={{ tabs, prefixCls }}>
            <div
                ref={ref}
                id={id}
                className={classNames(
                    [`${prefixCls}-tabs`],
                    className,
                )}
                {...restProps}
            >
                {tabNavBar}
                <TabPanelList
                    destroyInactiveTabPane={destroyInactiveTabPane}
                    {...sharedProps}
                    animated={mergedAnimated}
                />
            </div>
        </TabContext.Provider>
    )
}

const ForwardTabs = React.forwardRef(Tabs);

export type ForwardTabsType = typeof ForwardTabs & { TabPane: typeof TabPane };

(ForwardTabs as ForwardTabsType).TabPane = TabPane;

export default ForwardTabs as ForwardTabsType;
