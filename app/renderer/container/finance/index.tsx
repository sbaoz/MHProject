import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import { BaseLayout, Calendar, Button, DialogModal } from '@common/components/index';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/messager';
import RecordArea from '@src/container/finance/components/RecordArea';
import OptionArea from '@src/container/finance/components/OptionArea';
import useUpdateFinanceHook from "@src/container/finance/hooks/useUpdateFinanceHook";
import './index.less';

export default function Finance() {
    const [data, setData] = useState('');
    const [formName, setFormName] = useState('');
    const [curConsumptionRecord, setCurConsumptionRecord] = useState(null);
    const [curFinancialRecord, setCurFinancialRecord] = useState(null);
    const useUpdateFinance = useUpdateFinanceHook();

    const onClickDay = (day: any): void => {
        console.log('onClickDay', day.format('YYYY-MM-DD'));
        useUpdateFinance('curDate', day.format('YYYY-MM-DD'));
    }

    const onUpdateConsumptionRecords = (formDate: any) => {
        console.log('onSetConsumptionOption', formDate);
        const {
            id,
            consumType,
            consumName,
            price,
            channel,
            payer,
            remark
        } = formDate;
        useUpdateFinance('consumptionRecords', {
            id,
            consumType,
            consumName,
            price,
            channel,
            payer,
            remark
        });
    }

    const onUpdateFinancialRecords = (formDate: any) => {
        console.log('onSetFinancialOption', formDate);
        const {
            id,
            financType,
            financName,
            share,
            unitPrice,
            totalPrice,
            channel,
            payer,
            remark
        } = formDate;
        useUpdateFinance('financialRecords', {
            id,
            financType,
            financName,
            share,
            unitPrice,
            totalPrice,
            channel,
            payer,
            remark
        });
    }

    // const onSendMessage = (formName: string) => {
    //     Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, {
    //         form_name: formName
    //     });
    // }
    //
    // const onReceive = (e: any) => {
    //     Messager.receive(e, (data: any) => {
    //         console.log('发布订阅，传参值为: ', data);
    //         setFormName(data.form_name);
    //     });
    // }

    useEffect(() => {
        // getAppPath().then((rootPath: string) => {
        //     console.log('应用程序的目录路径为: ', rootPath);
        //     fileAction.read(`${rootPath}app/renderer/container/finance/index.tsx`).then(data => {
        //         setData(data);
        //     })
        // })
        // document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
        useUpdateFinance('curDate', dayjs().format('YYYY-MM-DD'));

        return () => {
            // document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
        }
    }, []);

    return (
        <>
            <BaseLayout>
                <div styleName='container'>
                    <div styleName='option-area'>
                        <Calendar style={{ margin: 0, flex: 'none' }} callback={onClickDay}/>
                        <OptionArea type='consumption' callback={onUpdateConsumptionRecords} record={curConsumptionRecord} />
                        <OptionArea type='financial' callback={onUpdateFinancialRecords} record={curFinancialRecord} />
                        {/*<div onClick={() => onSendMessage('FinancialRecordOptionArea')}>*/}
                        {/*    <p>FinancialRecordOptionArea</p>*/}
                        {/*    <Button onClick={(e: React.MouseEvent) => {*/}
                        {/*        e.stopPropagation() // 阻止冒泡*/}
                        {/*        console.log('Button Click')*/}
                        {/*    }}>send</Button>*/}
                        {/*</div>*/}
                    </div>
                    <RecordArea />
                </div>
            </BaseLayout>
            {
                formName &&
                <DialogModal
                    title={formName}
                    config={
                        {
                            cancelBtn: {
                                callback: () => { setFormName('');
                                }
                            }
                        }
                    }
                >
                {formName}
                </DialogModal>
            }
        </>
    )
}
