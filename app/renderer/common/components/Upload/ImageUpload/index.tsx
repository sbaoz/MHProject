/*
* @description 图片上传组件 基于BaseUpload二次封装
* */
import React from 'react';
import BaseUpload from '@common/components/Upload/BaseUpload';
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
        <div className="es_input_image_upload_wrapper" onClick={otherProps.onAfterClick}>
            {!preventInputManager && (
                <div className="es_input_image_upload_input">
                    <BaseUpload {...otherProps} onAfterClick={() => {}} style={{ width: '112px', height: '152px' }} />
                </div>
            )}
            <div className="es_input_image_upload_box">
                <img src={icon} className="es_input_image_upload__icon" />
                <p>{text}</p>
            </div>
        </div>
    )
}

export default ImageUpload;
