import React, { useRef } from 'react';
import { Button } from '@common/components';
import ConsumptionForm from '@src/container/finance/components/ConsumptionForm';
import FinancialForm from '@src/container/finance/components/FinancialForm';
import './index.less';

interface IProps {
    type: 'consumption' | 'financial'
    record: any
    callback: (formDate: any) => void
}

function OptionArea({ type, record, callback }: IProps) {
    let formRef = useRef();

    const onConfirm = () => {
        callback(formRef);
    }

    const onReset = () => {
        formRef && formRef.reset();
    }

    return (
        <div styleName='container'>
            <div styleName='content'>
                {
                    type === 'consumption' ?
                        <ConsumptionForm ref={ref => formRef = ref} record={record} /> :
                        <FinancialForm ref={ref => formRef = ref} record={record} />
                }
            </div>
            <div styleName='footer'>
                <Button style={{ marginRight: '15px', color: '#fff', backgroundColor: '#6cda01' }} onClick={() => onConfirm()}>确认</Button>
                <Button style={{ marginRight: '15px', color: '#fff', backgroundColor: '#f42920' }} onClick={() => onReset()}>重置</Button>
            </div>
        </div>
    )
}

export default OptionArea;
