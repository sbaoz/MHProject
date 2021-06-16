import React, { useContext } from 'react';
import Header from '@common/components/Layout/Header';
import './index.less';

interface IProps {
    children: React.ReactNode | any,
    className?: string
}

function BaseLayout({ children, className }: IProps) {
    return (
        <div styleName='base_wrapper' className={className}>
            <Header />
            <div styleName='base_content'>
                {children}
            </div>
        </div>
    )
}

export default BaseLayout;
