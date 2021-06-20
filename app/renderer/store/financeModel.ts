import { CONSUM_TYPE, FINANC_TYPE } from '@common/constants/finance';

const financeModel: TSRcReduxModel.Props<TSFinance.DailyFinance> = {
    namespace: 'financeModel',
    openSeamlessImmutable: true,
    state: {
        curDate: '',
        curConsumptionRecord: {
            id: '',
            consumType: '',
            consumName: '',
            price: '',
            channel: '',
            payer: '',
            remark: ''
        },
        curFinancialRecord: {
            id: '',
            financType: '',
            financName: '',
            share: '',
            unitPrice: '',
            totalPrice: '',
            channel: '',
            payer: '',
            remark: ''
        },
        consumptionRecords: [],
        financialRecords: []
    }
}

export default financeModel;
