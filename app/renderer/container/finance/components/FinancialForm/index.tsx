import React, { forwardRef, useImperativeHandle, useState} from 'react';
import { Select } from 'antd';
import { Input } from '@common/components';
import { createUID } from "@common/utils";
import { FINANC_TYPE } from '@common/constants/finance';
import styles from './index.less';

const { Option } = Select;

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

    const handleFormItemChange = (value: any, itemName: string) => {
        switch (itemName) {
            case 'financType':
                setFinancType(value);
                break;
            case 'financName':
                setFinancName(value);
                break;
            case 'share':
                setShare(value);
                break;
            case 'unitPrice':
                setUnitPrice(value);
                break;
            case 'totalPrice':
                setTotalPrice(value);
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
                <Select
                    className={styles.select}
                    value={financType}
                    onChange={(value) => handleFormItemChange(value, 'financType')}
                >
                    {
                        Object.keys(FINANC_TYPE).map(key => {
                            return (
                                <Option key={key} value={key}>{FINANC_TYPE[key]}</Option>
                            )
                        })
                    }
                </Select>
            </div>
            <div styleName='form-item'>
                <label htmlFor="financName">产品名称：</label>
                <Input
                    id='financName'
                    allowClear
                    value={financName}
                    onChange={(e) => handleFormItemChange(e.target.value, 'financName')}
                />
            </div>
            <div styleName='one-row'>
                <div styleName='form-item'>
                    <label htmlFor="share">买入份额：</label>
                    <Input
                        id='share'
                        allowClear
                        value={share}
                        onChange={(e) => handleFormItemChange(e.target.value, 'share')}
                    />
                </div>
                <div styleName='form-item'>
                    <label htmlFor="unitPrice">买入单价：</label>
                    <Input
                        id='unitPrice'
                        allowClear
                        value={unitPrice}
                        onChange={(e) => handleFormItemChange(e.target.value, 'unitPrice')}
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
                        onChange={(e) => handleFormItemChange(e.target.value, 'channel')}
                    />
                </div>
                <div styleName='form-item'>
                    <label htmlFor="totalPrice">买入总价：</label>
                    <Input
                        id='totalPrice'
                        allowClear
                        value={totalPrice}
                        onChange={(e) => handleFormItemChange(e.target.value, 'totalPrice')}
                    />
                </div>
            </div>
            <div styleName='form-item'>
                <label htmlFor="payer">支付人：</label>
                <Input
                    id='payer'
                    allowClear
                    value={payer}
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

const FinancialForm = forwardRef(InternalForm);

export default FinancialForm;
