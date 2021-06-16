import React, { useState, useEffect } from 'react';
import fileAction from '@common/utils/file';
import { getAppPath } from '@common/utils/appPath';
import { BaseLayout, Calendar } from '@common/components/index';
import './index.less';

export default function Finance() {
    const [data, setData] = useState('');
    useEffect(() => {
        // getAppPath().then((rootPath: string) => {
        //     console.log('应用程序的目录路径为: ', rootPath);
        //     fileAction.read(`${rootPath}app/renderer/container/finance/index.tsx`).then(data => {
        //         setData(data);
        //     })
        // })
    }, []);

    return (
        <BaseLayout>
            <div styleName='container'>
                <Calendar />
                <div>record_area</div>
            </div>
        </BaseLayout>
    )
}
