import * as React from 'react';
import lessStyles from './index.less';

interface IProps {
    text: string;
    styles: React.CSSProperties
}

export default function Title({ text, styles }: IProps) {
    debugger;
    return (
        <div style={styles} className={lessStyles.title}>
            {text}
        </div>
    )
}
