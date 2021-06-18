import React, { forwardRef, useImperativeHandle, useState} from 'react';
import { Input } from '@common/components';
import './index.less';

const InternalForm = (props: any, ref: any) => {
    const [financName, setFinancName] = useState('');

    const handleFormItemChange = (e: any, itemName: string) => {
        switch (itemName) {
            case 'financName':
                setFinancName(e.target.value);
                break;
        }
    }

    const reset = () => {
        setFinancName('');
    }

    useImperativeHandle(ref, () => ({
        financName,
        reset
    }))

    return (
        <div styleName='container'>
            <h1>新增理财记录</h1>
            <div styleName='form-item'>
                <label htmlFor="financName">理财品类：</label>
                <Input
                    id='financName'
                    allowClear
                    value={financName}
                    onChange={(e) => handleFormItemChange(e, 'financName')}
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
                    <label htmlFor="financName">买入份额：</label>
                    <Input
                        id='financName'
                        allowClear
                        value={financName}
                        onChange={(e) => handleFormItemChange(e, 'financName')}
                    />
                </div>
                <div styleName='form-item'>
                    <label htmlFor="financName">买入单价：</label>
                    <Input
                        id='financName'
                        allowClear
                        value={financName}
                        onChange={(e) => handleFormItemChange(e, 'financName')}
                    />
                </div>
            </div>
            <div styleName='one-row'>
                <div styleName='form-item'>
                    <label htmlFor="financName">买入渠道：</label>
                    <Input
                        id='financName'
                        allowClear
                        value={financName}
                        onChange={(e) => handleFormItemChange(e, 'financName')}
                    />
                </div>
                <div styleName='form-item'>
                    <label htmlFor="financName">买入总价：</label>
                    <Input
                        id='financName'
                        allowClear
                        value={financName}
                        onChange={(e) => handleFormItemChange(e, 'financName')}
                    />
                </div>
            </div>
            <div styleName='form-item'>
                <label htmlFor="financName">支付人：</label>
                <Input
                    id='financName'
                    allowClear
                    value={financName}
                    onChange={(e) => handleFormItemChange(e, 'financName')}
                />
            </div>
            <div styleName='form-item'>
                <label htmlFor="financName">备注：</label>
                <Input
                    id='financName'
                    type='textarea'
                    maxLength={100}
                    value={financName}
                    allowClear
                    onChange={(e) => handleFormItemChange(e, 'financName')}
                />
            </div>
        </div>
    )
}

const FinancialForm = forwardRef(InternalForm);

export default FinancialForm;
