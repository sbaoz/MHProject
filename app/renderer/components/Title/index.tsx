import * as React from 'react';
import './index.less';
import Pic from '../../../assets/pic01.png';

interface IProps {
    text: string;
    styles: React.CSSProperties
}

export default function Title({ text, styles }: IProps) {
    return (
        <div style={styles} styleName="title">
            <img src={Pic} alt=""/>
            {text}
        </div>
    )
}
