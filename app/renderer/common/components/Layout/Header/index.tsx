import React, {useEffect} from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import './index.less';

function Header() {
    const history = useHistory();
    const currentPage = useSelector((state: any) => state.globalModel.currentPage);

    const onBack = () => {
        history.goBack();
    }

    return (
        <div styleName='header'>
            <span styleName='back' onClick={onBack}>返回</span>
            <span styleName='title'>{currentPage}</span>
        </div>
    )
}

export default Header;
