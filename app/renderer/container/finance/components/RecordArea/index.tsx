import React from 'react';
import { Tabs, ScrollBox } from '@common/components';
import Record from './Record';
import './index.less';

const { TabPane } = Tabs;

function RecordArea({columns, consumData, financData, handleRowClick}) {
    const callback = (activeKey: string) => {
        console.log(activeKey);
    }

    console.log('columnscolumns', columns);

    return (
        <div styleName='container'>
            <Tabs
                prefixCls={'record'}
                defaultActiveKey="1"
                tabBarGutter={3}
                onChange={callback}
            >
                <TabPane tab="消费记录" key="1">
                    {/*<ScrollBox
                        maxHeight='calc(100vh - 585px)'
                    >
                    </ScrollBox>*/}
                    <Record
                        rowKey="id"
                        columns={columns?.current.consumColumns}
                        data={consumData}
                        onRow={record => {
                            return {
                                onClick: event => {
                                    if (event.target.innerText !== '删除' &&
                                        event.target.innerText !== '取 消' &&
                                        event.target.innerText !== '确 定') {
                                        handleRowClick('consum', record);
                                    }
                                }, // 点击行
                            };
                        }}
                    />
                </TabPane>
                <TabPane tab="理财记录" key="2">
                    <Record
                        rowKey="id"
                        columns={columns?.current.financColumns}
                        data={financData}
                        onRow={record => {
                            return {
                                onClick: event => {
                                    if (event.target.innerText !== '删除' &&
                                        event.target.innerText !== '取 消' &&
                                        event.target.innerText !== '确 定') {
                                        handleRowClick('financ', record);
                                    }
                                }, // 点击行
                            };
                        }}
                    />
                </TabPane>
                <TabPane tab="分析报表" key="3">
                    分析报表
                </TabPane>
            </Tabs>
        </div>
    )
}

export default RecordArea;
