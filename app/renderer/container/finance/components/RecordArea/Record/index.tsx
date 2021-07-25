import React from 'react';
import { Table } from 'antd';
import './index.less';

function Record({ rowKey, columns, data, onRow }: any) {
    return (
        <Table rowKey={rowKey} columns={columns} dataSource={data} onRow={onRow} />
    )
}

export default Record;