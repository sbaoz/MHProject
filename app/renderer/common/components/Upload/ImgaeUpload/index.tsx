/*
* @description 图片上传组件 基于BaseUpload二次封装
* */
import React from 'react';
import {BaseUpload} from '@common/components';
import './index.less'

interface Iprops extends TSUpload.Upload {
    /*
    * @description 图标
    * */
    icon?: any;
    /*
    * @description 文本
    * */
    text?: any;
    /*
    * @description 是否阻止点击之后显示文件管理器
    * */
    preventInputManager?: boolean;
}

const ImageUpload: React.FC<Iprops> = ({
    icon,
    text = '上传头像',
    preventInputManager= false,
    onAfterChange = () => {},
    ...otherProps
}) => {
    return (
        <div>

        </div>
    )
}
