import React from 'react';
import { useHistory } from 'react-router';
import { shell } from 'electron';
import './index.less';

export default function Root() {
    const history = useHistory();

    const onRouterToLink = (type?: string) => {
        if (type === 'shell') {
            // 通过 shell 模块，打开默认浏览器
            shell.openExternal('https://www.baidu.com');
        } else {
            history.push('/home');
        }
    }

    return (
        <div styleName='root'>
            <div styleName='container'>
                <div styleName='entry'>
                    <p styleName='title' onClick={() => onRouterToLink()}>
                        MHProject
                    </p>
                </div>
                <div styleName='footer' onClick={() => onRouterToLink('shell')}>
                    <p styleName='copyright'>Copyright © 2021-{new Date().getFullYear()} All Rights Reserved. Copyright By xiaojz</p>
                </div>
            </div>
        </div>
    )
}
