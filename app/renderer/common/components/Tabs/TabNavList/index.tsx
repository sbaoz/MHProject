import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import TabContext from '@common/components/Tabs/TabContext';
import TabNode from '@common/components/Tabs/TabNavList/TabNode';
import useRefs from '@common/components/Tabs/hooks/useRefs';

export interface TabNavListProps {
    id: string;
    activeKey: string;
    panes: React.ReactNode;
    tabBarGutter?: number;
    className?: string;
    style?: React.CSSProperties;
    onTabClick: (activeKey: React.Key, e: React.MouseEvent) => void;
    children?: (node: React.ReactElement) => React.ReactElement;
}

function TabNavList(props: TabNavListProps, ref: React.Ref<HTMLDivElement>) {
    const {prefixCls, tabs} = React.useContext(TabContext);
    const {
        className,
        style,
        id,
        activeKey,
        tabBarGutter,
        children,
        onTabClick
    } = props;
    const tabsWrapperRef = useRef<HTMLDivElement>();
    const tabListRef = useRef<HTMLDivElement>();
    const [getBtnRef, removeBtnRef] = useRefs<HTMLDivElement>();
    const tabNodes: React.ReactElement[] = tabs.map(tab => {
        const {key} = tab;
        return (
            <TabNode
                id={id}
                prefixCls={prefixCls}
                key={key}
                tab={tab}
                active={key === activeKey}
                tabBarGutter={tabBarGutter}
                renderWrapper={children}
                ref={getBtnRef(key)}
                onClick={e => {
                    onTabClick(key, e);
                }}
                onFocus={() => {
                    if (tabsWrapperRef.current) {
                        tabsWrapperRef.current.scrollTop = 0;
                    }
                }}
            />
        )
    })
    const wrapPrefix = `${prefixCls}-nav-wrap`;

    return (
        <div
            ref={ref}
            className={classNames(`${prefixCls}-nav`, className)}
            style={style}
        >
            <div
                className={classNames(wrapPrefix)}
                ref={tabsWrapperRef}
            >
                <div
                    className={`${prefixCls}-nav-list`}
                    ref={tabListRef}
                >
                    {tabNodes}
                </div>

            </div>
        </div>
    )
}

export default React.forwardRef(TabNavList);
