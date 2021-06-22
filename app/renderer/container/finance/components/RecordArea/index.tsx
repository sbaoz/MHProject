import React from 'react';
import Tabs, { TabPane } from '@common/components/Tabs';
import classNames from 'classnames';
import './index.less';

function RecordArea() {
    const callback = (activeKey: string) => {
        console.log(activeKey);
    }

    return (
        <div styleName='container'>
            <Tabs
                prefixCls={'record'}
                defaultActiveKey="2"
                onChange={callback}
            >
                <TabPane tab="tab 1" key="1">
                    first
                </TabPane>
                <TabPane tab="tab 2" key="2">
                    second
                </TabPane>
                <TabPane tab="tab 3" key="3">
                    third
                </TabPane>
            </Tabs>
        </div>
    )
}

export default RecordArea;
