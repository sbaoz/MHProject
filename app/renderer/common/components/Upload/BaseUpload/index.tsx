/*
* @desc 上传控件，默认自带的input样式
* */
import React, { useRef } from 'react';
import classNames from 'classnames';
import FileEvent from '@common/components/Upload/fileEvent';
import './index.less';

function BaseUpload({ style, accept, multiple = false, visible = true, onAfterClick, onAfterChange }: TSUpload.Upload) {
    const inputSelectorRef = useRef(null);

    function onChange(e: any) {
        const fileList: any = e?.target?.files || [];
        if (e.target.value === '') {
            return;
        }
        const instance: TSUpload.File[] = [];
        for (let file of fileList) {
            instance.push(new FileEvent(file))
        }
    }

    return (
        <input
            ref={inputSelectorRef}
            type="file"
            style={style}
            accept={accept}
            multiple={multiple}
            onClick={onAfterClick}
            onChange={onChange}
            className={classNames('es-input-selector', {
                'es-input-selector-visible': visible,
                'es-input-selector-hidden': !visible
            })}
        />
    )
}

export default BaseUpload;
