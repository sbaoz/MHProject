import { useSelector, useDispatch } from 'react-redux';

function useUpdateFinanceHook() {
    const useUpdateCurDate = useUpdateCurDateHook();
    const useUpdateConsumptionRecords = useUpdateConsumptionRecordsHook();
    const useUpdateFinancialRecords = useUpdateconFinancialRecordsHook();

    return <T>(stateKey: string, stateValue: T) => {
        const keys = stateKey.split('/') || [];
        switch (keys[0]) {
            case 'curDate':
                useUpdateCurDate(keys[0], stateValue);
                break;
            case 'consumptionRecords':
                useUpdateConsumptionRecords(keys[0], stateValue);
                break;
            case 'financialRecords':
                useUpdateFinancialRecords(keys[0], stateValue);
                break;
        }
    }
}

function useUpdateCurDateHook() {
    const dispatch = useDispatch();
    return <T>(stateKey: string, stateValue: T) => {
        dispatch({
            type: 'financeModel/setStore',
            payload: {
                key: stateKey,
                values: stateValue
            }
        });
    }
}

function useUpdateConsumptionRecordsHook() {
    const dispatch = useDispatch();
    let consumptionRecords = useSelector((state: any) => state.financeModel.consumptionRecords);
    return <T>(stateKey: string, stateValue: T) => {
        const exitedRecord = consumptionRecords.find((item: any) => item.id === stateValue.id);
        if (exitedRecord) {
            exitedRecord.consumType = stateValue.consumType;
            exitedRecord.consumName = stateValue.consumName;
            exitedRecord.price = stateValue.price;
            exitedRecord.channel = stateValue.channel;
            exitedRecord.payer = stateValue.payer;
            exitedRecord.remark = stateValue.remark;
        } else {
            consumptionRecords = [...consumptionRecords, stateValue];
        }
        dispatch({
            type: 'financeModel/setStore',
            payload: {
                key: 'consumptionRecords',
                values: consumptionRecords
            }
        });
    }
}

function useUpdateconFinancialRecordsHook() {
    const dispatch = useDispatch();
    let financialRecords = useSelector((state: any) => state.financeModel.financialRecords);
    return <T>(stateKey: string, stateValue: T) => {
        const exitedRecord = financialRecords.find((item: any) => item.id === stateValue.id);
        if (exitedRecord) {
            exitedRecord.financType = stateValue.financType;
            exitedRecord.financName = stateValue.financName;
            exitedRecord.share = stateValue.share;
            exitedRecord.unitPrice = stateValue.unitPrice;
            exitedRecord.totalPrice = stateValue.totalPrice;
            exitedRecord.channel = stateValue.channel;
            exitedRecord.payer = stateValue.payer;
            exitedRecord.remark = stateValue.remark;
        } else {
            financialRecords = [...financialRecords, stateValue];
        }
        dispatch({
            type: 'financeModel/setStore',
            payload: {
                key: 'financialRecords',
                values: financialRecords
            }
        });
    }
}

export default useUpdateFinanceHook;
