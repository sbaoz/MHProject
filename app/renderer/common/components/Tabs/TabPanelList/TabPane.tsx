import React, { useState, useEffect } from "react";
import classNames from 'classnames';

export interface TabPaneProps {
    tab?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    forceRender?: boolean;
    prefixCls?: string;
    tabKey?: string;
    id?: string;
    animated?: boolean;
    active?: boolean;
    destroyInactiveTabPane?: boolean;
}

function TabPane(
    {
        prefixCls,
        forceRender,
        className,
        style,
        id,
        active,
        animated,
        destroyInactiveTabPane,
        tabKey,
        children
    }: TabPaneProps
) {
    const [visited, setVisited] = useState(forceRender);

    useEffect(() => {
        if (active) {
            setVisited(true);
        } else if (destroyInactiveTabPane) {
            setVisited(false)
        }
    }, [active, destroyInactiveTabPane]);

    const mergedStyle: React.CSSProperties = {};
    if (!active) {
        if (animated) {
            mergedStyle.visibility = 'hidden';
            mergedStyle.height = 0;
            mergedStyle.overflowY = 'hidden';
        } else {
            mergedStyle.display = 'none';
        }
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
            {(active || visited || forceRender) && children}
        </div>
    )
}

export default TabPane;
