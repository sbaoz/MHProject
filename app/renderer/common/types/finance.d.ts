declare namespace TSFinance {
    enum CONSUM_TYPE {
        Commodity = '日用品',
        Food = '食品',
        Drink = '饮料',
        Clothing = '服装',
        Electrical = '电器'
    }
    enum FINANC_TYPE {
        Deposit = '存款',
        EquityFund = '股票基金',
        MoneyFund = '货币基金'
    }
    type ConsumType = keyof Record<CONSUM_TYPE, string>;
    type FinancType = FINANC_TYPE;

    /**
     * @description 消费记录
     */
    export interface ConsumptionRecord {
        id: string
        /**
         * @description 消费品类
         */
        consumType: ConsumType | ''
        /**
         * @description 消费名称
         */
        consumName: string
        /**
         * @description 价格
         */
        price: string
        /**
         * @description 消费渠道
         */
        channel: string
        /**
         * @description 支付人
         */
        payer: string
        /**
         * @description 备注
         */
        remark?: string
    }
    /**
     * @description 理财记录
     */
    export interface FinancialRecord {
        id: string
        /**
         * @description 理财品类
         */
        financType: FinancType | ''
        /**
         * @description 产品名称
         */
        financName: string
        /**
         * @description 买入份额
         */
        share: string
        /**
         * @description 买入单价
         */
        unitPrice: string
        /**
         * @description 买入总价
         */
        totalPrice: string
        /**
         * @description 买入渠道
         */
        channel: string
        /**
         * @description 支付人
         */
        payer: string
        /**
         * @description 备注
         */
        remark?: string
    }

    export interface DailyFinance {
        curDate: string | number,
        curFinancialRecord: FinancialRecord,
        curConsumptionRecord: ConsumptionRecord,
        consumptionRecords?: ConsumptionRecord[],
        financialRecords?: FinancialRecord[]
    }
}
