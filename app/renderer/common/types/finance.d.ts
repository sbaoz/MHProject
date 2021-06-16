declare namespace TSFinance {
    /**
     * @description 消费记录
     */
    export interface ConsumptionRecord {
        /**
         * @description 消费日期
         */
        consumDate: string | number
        /**
         * @description 消费品类
         */
        consumType: string
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
        /**
         * @description 买入日期
         */
        financDate: string | number
        /**
         * @description 理财品类
         */
        financType: string
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
        date: string | number,
        consumptionRecords?: ConsumptionRecord[],
        financialRecords?: FinancialRecord[]
    }

    export interface FinanceRecord {
        financeRecords: DailyFinance[]
    }
}
