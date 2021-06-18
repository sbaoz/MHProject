import React, { useRef } from 'react';
import { Button } from '@common/components';
import ConsumptionForm from '@src/container/finance/components/ConsumptionForm';
import FinancialForm from '@src/container/finance/components/FinancialForm';
import './index.less';

interface IProps {
    type: 'consumption' | 'financial'
}

function OptionArea({ type }: IProps) {
    let formRef = useRef();

    const onConfirm = () => {
        console.log('formRef', formRef);
    }

    const onReset = () => {
        formRef && formRef.reset();
    }

    return (
        <div styleName='container'>
            <div styleName='content'>
                {
                    type === 'consumption' ?
                        <ConsumptionForm ref={ref => formRef = ref} /> :
                        <FinancialForm ref={ref => formRef = ref} />
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
