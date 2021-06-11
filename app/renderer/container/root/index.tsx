import React, {useEffect} from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { shell } from 'electron';
import { ROUTER_ENTRY } from '@common/constants/router';
import { isHttpOrHttpsUrl } from '@common/utils/router';
import './index.less';

export default function Root() {
    const history = useHistory();
    const dispatch = useDispatch();
    const appName = useSelector((state: any) => state.globalModel.appName);

    useEffect(() => {
        setTimeout(() => {
            console.log('3s 后修改...');
            dispatch({
                type: 'globalModel/setStore',
                payload: {
                    key: 'appName',
                    values: 'visResumeMook',
                },
            });
        }, 3000);
    }, []);

    useEffect(() => {
        console.log('appName = ', appName);
    }, [appName]);

    const onRouterToLink = (router: TSRouter.Item) => {
        if (isHttpOrHttpsUrl(router.url)) {
            // 通过 shell 模块，打开默认浏览器
            shell.openExternal(router.url);
        } else {
            history.push(router.url);
        }
    }

    return (
        <div styleName='root'>
            <div styleName='container'>
                <div styleName='entry'>
                    {
                        ROUTER_ENTRY.map(item => (
                            <p styleName='title' key={item.key} onClick={() => onRouterToLink(item)}>
                                {item.text}
                            </p>
                        ))
                    }
                </div>
                <div styleName='footer'>
                    <p styleName='copyright'>Copyright © 2021-{new Date().getFullYear()} All Rights Reserved. Copyright By xiaojz</p>
                </div>
            </div>
        </div>
    )
}
