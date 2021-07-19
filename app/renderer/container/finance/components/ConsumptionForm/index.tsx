import React, { forwardRef, useImperativeHandle, useState} from 'react';
import { Select } from 'antd';
import { Input } from '@common/components';
import { createUID } from '@common/utils/index';
import styles from './index.less';

const { Option } = Select;

const InternalForm = (props: any, ref: any) => {
    const { record } = props;
    const [consumType, setConsumType] = useState(record && record.consumType || '');
    const [consumName, setConsumName] = useState(record && record.consumName || '');
    const [price, setPrice] = useState(record && record.price || '');
    const [channel, setChannel] = useState(record && record.channel || '');
    const [payer, setPayer] = useState(record && record.payer || '');
    const [remark, setRemark] = useState(record && record.remark || '');

    const handleFormItemChange = (value: any, itemName: string) => {
        switch (itemName) {
            case 'consumType':
                setConsumType(value);
                break;
            case 'consumName':
                setConsumName(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'channel':
                setChannel(value);
                break;
            case 'payer':
                setPayer(value);
                break;
            case 'remark':
                setRemark(value);
                break;
        }
    }

    useImperativeHandle(ref, () => ({
        id: record && record.id || createUID(),
        consumType,
        consumName,
        price,
        channel,
        payer,
        remark,
        reset: () => {
            return new Promise((resolve, reject) => {
                setConsumType('');
                setConsumName('');
                setPrice('');
                setChannel('');
                setPayer('');
                setRemark('');
                resolve('');
            })
        }
    }), [
        consumType,
        consumName,
        price,
        channel,
        payer,
        remark
    ]);

    return (
        <div styleName='container'>
            <h1>编辑消费记录</h1>
            <div styleName='form-item'>
                <label htmlFor="consumType">消费品类：</label>
                <Select
                    className={styles.select}
                    value={consumType}
                    onChange={(value) => handleFormItemChange(value, 'consumType')}
                >
                    <Option key="option_1" value="111" selected>aaa</Option>
                    <Option key="option_2" value="222">bbb</Option>
                </Select>
            </div>
            <div styleName='form-item'>
                <label htmlFor="consumName">消费名称：</label>
                <Input
                    id='consumName'
                    value={consumName}
                    allowClear
                    onChange={(e) => handleFormItemChange(e.target.value, 'consumName')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="price">价格：</label>
                <Input
                    id='price'
                    value={price}
                    allowClear
                    onChange={(e) => handleFormItemChange(e.target.value, 'price')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="channel">消费渠道：</label>
                <Input
                    id='channel'
                    value={channel}
                    allowClear
                    onChange={(e) => handleFormItemChange(e.target.value, 'channel')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="payer">支付人：</label>
                <Input
                    id='payer'
                    value={payer}
                    allowClear
                    onChange={(e) => handleFormItemChange(e.target.value, 'payer')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="remark">备注：</label>
                <Input
                    id='remark'
                    type='textarea'
                    maxLength={100}
                    value={remark}
                    allowClear
                    onChange={(e) => handleFormItemChange(e.target.value, 'remark')}
                />
            </div>
        </div>
    )
}

const ConsumptionForm = forwardRef(InternalForm);

export default ConsumptionForm;
