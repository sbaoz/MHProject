declare namespace TSUpload {
    /*
    * @description 上传框
    * */
    export interface Upload {
        /*
        * @description 样式
        * */
        style?: React.CSSProperties;
        /*
        * @description 上传的文件类型
        * */
        accept?: string;
        /*
        * @description 支持多选文件
        * */
        multiple?: boolean;
        /*
        * @description 原始组件是否可见
        * */
        visible?: boolean;
        /*
        * @description 点击后回调事件
        * */
        onAfterClick?: () => void;
        /*
        * @description change回调事件，回传选中的文件列表
        * */
        onAfterChange?: (fileList: File[]) => void;
    }

    /*
    * @description 文件
    * */
    export interface File {
        /*
        * @description 标识
        * */
        uuid: string;
        /*
        * @description 样式
        * */
        file: any;
        /*
        * @description 类型
        * */
        fileType: string;
        /*
        * @description 本地预览
        * */
        base64URL: string;
        /*
        * @description 释放本地预览
        * */
        revokeFileBase64URL: (base64URL: string) => void;
        /*
        * @description 文件上传
        * */
        upload?: () => void;
        /*
        * @description 取消上传
        * */
        cancel?: () => void;
        /*
        * @description 重传
        * */
        retry?: () => void;
    }
}
