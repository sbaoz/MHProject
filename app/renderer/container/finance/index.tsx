import React, { useState } from 'react';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import { Button, Input, BaseUpload } from '@common/components/index';
import './index.less';

export default function Finance() {
    const [text, setText] = useState('');
    const [textArea, setTextArea] = useState('');

    getAppPath().then((rootPath: string) => {
        // console.log('应用程序的目录路径为: ', rootPath);
        fileAction.read(`${rootPath}app/renderer/container/finance/index.tsx`).then(data => {
            // console.log(data);
        })
    })

    const handleClick = () => {
        console.log('handleClick');
    }

    return (
        <div styleName='finance'>
            <Button onClick={handleClick}>Finance</Button>
            <Input
                value={text}
                placeholder="请输入" // 占位文本
                allowClear={true} // 是否显示清除icon
                onChange={(e) => setText(e.target.value)}
            />
            <Input
                value={textArea}
                placeholder="请输入" // 占位文本
                allowClear={true} // 是否显示清除icon
                onChange={(e) => setTextArea(e.target.value)}
                type="textarea" // 类型为多行文本
                rows={5} // 输入文本的行数
                maxLength={200} // 最多支持的文本长度
                allowCount={true} // 是否显示底部文本字数
            />
            <BaseUpload />
        </div>
    )
}
