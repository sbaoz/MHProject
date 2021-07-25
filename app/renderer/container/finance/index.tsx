import React, {useState, useEffect, useRef} from 'react';
import dayjs from "dayjs";
import { Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import { CONSUM_TYPE, FINANC_TYPE } from '@common/constants/finance';
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
    const [consumData, setConsumData] = useState([]);
    const [financData, setFinancData] = useState([]);

    const consumptionRecords = useSelector((state:any) => state.financeModel.consumptionRecords);
    const financialRecords = useSelector((state:any) => state.financeModel.financialRecords);
    const useUpdateFinance = useUpdateFinanceHook();

    const columns = useRef({});

    const handleDelete = (type: string, key: string) => {
        console.log('handleDelete', type, key);
    }
    const handleRowClick = (type: string, record) => {
        if (type === 'financ') {
            setCurFinancialRecord({
                ...record
            });
        } else {
            setCurConsumptionRecord({
                ...record
            });
        }
    }
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
        columns.current.financColumns = [
            {
                title: '理财品类',
                dataIndex: 'financType',
                key: 'financType',
                render: financType => FINANC_TYPE[financType]
            },
            {
                title: '产品名称',
                dataIndex: 'financName',
                key: 'financName',
            },
            {
                title: '买入份额',
                dataIndex: 'share',
                key: 'share',
            },
            {
                title: '买入单价',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
            },
            {
                title: '买入总价',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
            },
            {
                title: '买入渠道',
                dataIndex: 'channel',
                key: 'channel',
            },
            {
                title: '支付人',
                dataIndex: 'payer',
                key: 'payer',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '操作',
                key: 'option',
                render: (text, record) => {
                    return (
                        <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete('financ', record.id)}>
                            <a>删除</a>
                        </Popconfirm>
                    )
                }
            }
        ];
        columns.current.consumColumns = [
            {
                title: '消费品类',
                dataIndex: 'consumType',
                key: 'consumType',
                render: consumType => CONSUM_TYPE[consumType]
            },
            {
                title: '消费名称',
                dataIndex: 'consumName',
                key: 'consumName',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '消费渠道',
                dataIndex: 'channel',
                key: 'channel',
            },
            {
                title: '支付人',
                dataIndex: 'payer',
                key: 'payer',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '操作',
                key: 'option',
                render: (text, record) => {
                    return (
                        <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete('consum', record.id)}>
                            <a>删除</a>
                        </Popconfirm>
                    )
                }
            }
        ];
        return () => {
            // document.removeEventListener(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, onReceive);
        }
    }, []);
    useEffect(() => {
        const financData = financialRecords.map(item => {
            return {
                id: item.id,
                financType: item.financType,
                financName: item.financName,
                share: item.share,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
                channel: item.channel,
                payer: item.payer,
                remark: item.remark
            }
        });
        setFinancData(financData);
    }, [financialRecords])
    useEffect(() => {
        const consumData = consumptionRecords.map(item => {
            return {
                id: item.id,
                consumType: item.consumType,
                consumName: item.consumName,
                price: item.price,
                channel: item.channel,
                payer: item.payer,
                remark: item.remark
            }
        });
        setConsumData(consumData);
    }, [consumptionRecords])

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
                    <RecordArea columns={columns} consumData={consumData} financData={financData} handleRowClick={handleRowClick} />
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
