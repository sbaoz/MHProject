import React, { forwardRef, useImperativeHandle, useState} from 'react';
import { Input } from '@common/components';
import './index.less';
import {createUID} from "@common/utils";

const InternalForm = (props: any, ref: any) => {
    const { record } = props;
    const [financType, setFinancType] = useState(record && record.financType || '');
    const [financName, setFinancName] = useState(record && record.financName || '');
    const [share, setShare] = useState(record && record.share || '');
    const [unitPrice, setUnitPrice] = useState(record && record.unitPrice || '');
    const [totalPrice, setTotalPrice] = useState(record && record.totalPrice || '');
    const [channel, setChannel] = useState(record && record.channel || '');
    const [payer, setPayer] = useState(record && record.payer || '');
    const [remark, setRemark] = useState(record && record.remark || '');

    const handleFormItemChange = (e: any, itemName: string) => {
        switch (itemName) {
            case 'financType':
                setFinancType(e.target.value);
                break;
            case 'financName':
                setFinancName(e.target.value);
                break;
            case 'share':
                setShare(e.target.value);
                break;
            case 'unitPrice':
                setUnitPrice(e.target.value);
                break;
            case 'totalPrice':
                setTotalPrice(e.target.value);
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
        financType,
        financName,
        share,
        unitPrice,
        totalPrice,
        channel,
        payer,
        remark,
        reset: () => {
            return new Promise((resolve, reject) => {
                setFinancType('');
                setFinancName('');
                setShare('');
                setUnitPrice('');
                setTotalPrice('');
                setChannel('');
                setPayer('');
                setRemark('');
                resolve('');
            })
        }
    }), [
        financType,
        financName,
        share,
        unitPrice,
        totalPrice,
        channel,
        payer,
        remark,
    ]);

    return (
        <div styleName='container'>
            <h1>编辑理财记录</h1>
            <div styleName='form-item'>
                <label htmlFor="financType">理财品类：</label>
                <Input
                    id='financType'
                    allowClear
                    value={financType}
                    onChange={(e) => handleFormItemChange(e, 'financType')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="financName">产品名称：</label>
                <Input
                    id='financName'
                    allowClear
                    value={financName}
                    onChange={(e) => handleFormItemChange(e, 'financName')}
                />
            </div>
            <div styleName='one-row'>
                <div styleName='form-item'>
                    <label htmlFor="share">买入份额：</label>
                    <Input
                        id='share'
                        allowClear
                        value={share}
                        onChange={(e) => handleFormItemChange(e, 'share')}
                    />
                </div>
                <div styleName='form-item'>
                    <label htmlFor="unitPrice">买入单价：</label>
                    <Input
                        id='unitPrice'
                        allowClear
                        value={unitPrice}
                        onChange={(e) => handleFormItemChange(e, 'unitPrice')}
                    />
                </div>
            </div>
            <div styleName='one-row'>
                <div styleName='form-item'>
                    <label htmlFor="channel">买入渠道：</label>
                    <Input
                        id='channel'
                        allowClear
                        value={channel}
                        onChange={(e) => handleFormItemChange(e, 'channel')}
                    />
                </div>
                <div styleName='form-item'>
                    <label htmlFor="totalPrice">买入总价：</label>
                    <Input
                        id='totalPrice'
                        allowClear
                        value={totalPrice}
                        onChange={(e) => handleFormItemChange(e, 'totalPrice')}
                    />
                </div>
            </div>
            <div styleName='form-item'>
                <label htmlFor="payer">支付人：</label>
                <Input
                    id='payer'
                    allowClear
                    value={payer}
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

const FinancialForm = forwardRef(InternalForm);

export default FinancialForm;
