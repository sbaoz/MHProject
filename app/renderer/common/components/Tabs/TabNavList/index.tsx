import React from 'react';
import TabContext from '@common/components/Tabs/TabContext';
import './index.less';

interface TabNavListProps {

}

function TabNavList(props: TabNavListProps) {
    const {tabs} = React.useContext(TabContext);
    return (
        <div styleName='nav-list'>
            {tabNodes}
        </div>
    )
}

export default TabNavList;
