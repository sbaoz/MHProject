import React, { useState, useEffect } from "react";
import classNames from 'classnames';

export interface TabPaneProps {
    tab?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    prefixCls?: string;
    tabKey?: string;
    id?: string;
    active?: boolean;
    destroyInactiveTabPane?: boolean;
}

function TabPane(
    {
        prefixCls,
        className,
        style,
        id,
        active,
        tabKey,
        children
    }: TabPaneProps
) {
    const [visited, setVisited] = useState(false);

    useEffect(() => {
        if (active) {
            setVisited(true);
        }
    }, [active]);

    const mergedStyle: React.CSSProperties = {};
    if (!active) {
        mergedStyle.display = 'none';
    }

    return (
        <div
            id={id && `${id}-panel-${tabKey}`}
            tabIndex={active ? 0 : -1}
            style={{ ...mergedStyle, ...style }}
            className={classNames(
                `${prefixCls}-tabpane`,
                active && `${prefixCls}-tabpane-active`,
                className
            )}
        >
            {(active || visited) && children}
        </div>
    )
}

export default TabPane;
