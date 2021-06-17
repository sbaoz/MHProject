import React, { useState, useEffect } from 'react';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import { BaseLayout, Calendar, Button, DialogModal } from '@common/components/index';
import Messager, { MESSAGE_EVENT_NAME_MAPS } from '@common/messager';
import RecordArea from '@src/container/finance/components/RecordArea';
import OptionArea from "@src/container/finance/components/OptionArea";
import './index.less';

export default function Finance() {
    const [data, setData] = useState('');
    const [formName, setFormName] = useState('');

    const onClickDay = (day: any): void => {
        console.log('onClickDay', day.format('YYYY-MM-DD'));
    }

    const onSendMessage = (formName: string) => {
        Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, {
            form_name: formName
        });
    }

    const onReceive = (e: any) => {
        Messager.receive(e, (data: any) => {
            console.log('发布订阅，传参值为: ', data);
            setFormName(data.form_name);
        });
    }

    useEffect(() => {
        // getAppPath().then((rootPath: string) => {
        //     console.log('应用程序的目录路径为: ', rootPath);
        //     fileAction.read(`${rootPath}app/renderer/container/finance/index.tsx`).then(data => {
        //         setData(data);
        //     })
        // })
        document.addEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
        return () => {
            document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
        }
    }, []);

    return (
        <>
            <BaseLayout>
                <div styleName='container'>
                    <div styleName='option-area'>
                        <Calendar style={{ margin: 0 }} callback={onClickDay}/>
                        <OptionArea />
                        <OptionArea />
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
