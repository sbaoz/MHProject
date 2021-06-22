import React from "react";
import classNames from "classnames";
import type { Tab } from '@common/components/Tabs/interface';

export interface TabNodeProps {
    id: string;
    prefixCls: string;
    tab: Tab;
    active: boolean;
    onClick?: (e: React.MouseEvent) => void;
    tabBarGutter?: number;
    renderWrapper?: (node: React.ReactElement) => React.ReactElement;
    onFocus: React.FocusEventHandler;
}

function TabNode(
    {
        prefixCls,
        id,
        active,
        tab: {key, tab},
        tabBarGutter,
        renderWrapper,
        onClick,
        onFocus
    }: TabNodeProps,
    ref: React.Ref<HTMLDivElement>
) {
    const tabPrefix = `${prefixCls}-tab`;
    const nodeStyle: React.CSSProperties = { marginTop: tabBarGutter };

    function onInternalClick(e: React.MouseEvent) {
        onClick && onClick(e);
    }

    let node: React.ReactElement = (
        <div
            key={key}
            ref={ref}
            className={classNames(tabPrefix, {
                [`${tabPrefix}-active`]: active
            })}
            style={nodeStyle}
            onClick={onInternalClick}
        >
            <div
                id={id && `${id}-tab-${key}`}
                className={`${tabPrefix}-btn`}
                tabIndex={0}
                onClick={e => {
                    e.stopPropagation();
                    onInternalClick(e);
                }}
                onFocus={onFocus}
            >
                {tab}
            </div>
        </div>
    );

    if (renderWrapper) {
        node = renderWrapper(node);
    }

    return node;
}

export default React.forwardRef(TabNode);
