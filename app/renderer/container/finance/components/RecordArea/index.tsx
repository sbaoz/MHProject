import React from 'react';
import classNames from 'classnames';
import { Tabs, ScrollBox } from '@common/components';
import './index.less';

const { TabPane } = Tabs;

function RecordArea() {
    const callback = (activeKey: string) => {
        console.log(activeKey);
    }

    return (
        <div styleName='container'>
            <Tabs
                prefixCls={'record'}
                defaultActiveKey="1"
                tabBarGutter={3}
                onChange={callback}
            >
                <TabPane tab="记录列表" key="1">
                    <ScrollBox
                        maxHeight='calc(100vh - 585px)'
                    >
                    </ScrollBox>
                </TabPane>
                <TabPane tab="分析报表" key="2">
                    second
                </TabPane>
            </Tabs>
        </div>
    )
}

export default RecordArea;
