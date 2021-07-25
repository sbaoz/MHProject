import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import Router from '@src/router';
import store from '@src/store';
import zhCN from 'antd/lib/locale/zh_CN';

function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <Router />
            </Provider>
        </ConfigProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
