import React, { useState } from 'react';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import { ScrollBox } from '@common/components/index';
import './index.less';

export default function Finance() {
    getAppPath().then((rootPath: string) => {
        // console.log('应用程序的目录路径为: ', rootPath);
        fileAction.read(`${rootPath}app/renderer/container/finance/index.tsx`).then(data => {
            // console.log(data);
        })
    })

    const HEADER_ACTION_HEIGHT = 92;
    const height = document.body.clientHeight;

    return (
        <div styleName='container'>
          <ScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
          </ScrollBox>
        </div>
    )
}
