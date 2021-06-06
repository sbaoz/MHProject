import React, {


} from 'react';
import { Layout } from 'antd';
import './BasicLayout.less';

const BasicLayout = props => {
    return (
        <Layout>
            {props.children}
        </Layout>
    );
};

export default BasicLayout;
