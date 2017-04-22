import * as React from 'react';

import {
    PanelState,
} from '../reducer/panel';

import TextEdit from '../container/textedit';
import Geturl from './geturl';

export interface IPropEdit{
    panel: PanelState;
    open: boolean;
    onOpenClose(open: boolean): void;
}
export default ({panel, open, onOpenClose}: IPropEdit)=>{
    const mark = open ? '\u219f' : '\u21a1';

    const handleClick = ()=>{
        onOpenClose(!open);
    };

    let editarea = open ? <TextEdit /> : null;
    let urlarea = open ? <Geturl panel={panel} /> : null;
    return <div className="edit-wrapper">
        <div className="edit-start-button" onClick={handleClick}>
            問題を編集 {mark}
        </div>
        {editarea}
        {urlarea}
    </div>;
};
