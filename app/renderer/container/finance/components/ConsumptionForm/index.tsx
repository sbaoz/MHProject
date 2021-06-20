import React, { forwardRef, useImperativeHandle, useState} from 'react';
import { Input } from '@common/components';
import { createUID } from '@common/utils/index';
import './index.less';


const InternalForm = (props: any, ref: any) => {
    const { record } = props;
    const [consumType, setConsumType] = useState(record && record.consumType || '');
    const [consumName, setConsumName] = useState(record && record.consumName || '');
    const [price, setPrice] = useState(record && record.price || '');
    const [channel, setChannel] = useState(record && record.channel || '');
    const [payer, setPayer] = useState(record && record.payer || '');
    const [remark, setRemark] = useState(record && record.remark || '');

    const handleFormItemChange = (e: any, itemName: string) => {
        switch (itemName) {
            case 'consumType':
                setConsumType(e.target.value);
                break;
            case 'consumName':
                setConsumName(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'channel':
                setChannel(e.target.value);
                break;
            case 'payer':
                setPayer(e.target.value);
                break;
            case 'remark':
                setRemark(e.target.value);
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
                <Input
                    id='consumType'
                    value={consumType}
                    allowClear
                    onChange={(e) => handleFormItemChange(e, 'consumType')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="consumName">消费名称：</label>
                <Input
                    id='consumName'
                    value={consumName}
                    allowClear
                    onChange={(e) => handleFormItemChange(e, 'consumName')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="price">价格：</label>
                <Input
                    id='price'
                    value={price}
                    allowClear
                    onChange={(e) => handleFormItemChange(e, 'price')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="channel">消费渠道：</label>
                <Input
                    id='channel'
                    value={channel}
                    allowClear
                    onChange={(e) => handleFormItemChange(e, 'channel')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="payer">支付人：</label>
                <Input
                    id='payer'
                    value={payer}
                    allowClear
                    onChange={(e) => handleFormItemChange(e, 'payer')}
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
                    onChange={(e) => handleFormItemChange(e, 'remark')}
                />
            </div>
        </div>
    )
}

const ConsumptionForm = forwardRef(InternalForm);

export default ConsumptionForm;
