import { CONSUM_TYPE, FINANC_TYPE } from '@common/constants/finance';
const financeModel: TSRcReduxModel.Props<TSFinance.FinanceRecord> = {
    namespace: 'financeModel',
    openSeamlessImmutable: true,
    state: {
        financeRecords: [{
            date: '2021-06-15',
            consumptionRecords: [{
                consumDate: '2021-06-15 15:47:00',
                consumType: CONSUM_TYPE.Drink,
                consumName: '喜茶',
                price: '30',
                channel: '线下门店',
                payer: '张',
                remark: '金凤茶王'
            }],
            financialRecords: [{
                financDate: '2021-06-15 15:47:00',
                financType: FINANC_TYPE.EquityFund,
                financName: '军工',
                share: '100',
                unitPrice: '1.10',
                totalPrice: '110',
                channel: '天天基金',
                payer: '张'
            }]
        }]
    }
}

export default financeModel;
