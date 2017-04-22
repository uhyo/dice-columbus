import * as React from 'react';

import TextEdit from '../container/textedit';

export interface IPropEdit{
    open: boolean;
    onOpenClose(open: boolean): void;
}
export default ({open, onOpenClose}: IPropEdit)=>{
    const mark = open ? '\u219f' : '\u21a1';

    const handleClick = ()=>{
        onOpenClose(!open);
    };

    let editarea = open ? <TextEdit /> : null;
    return <div className="edit-wrapper">
        <div className="edit-start-button" onClick={handleClick}>
            問題を編集 {mark}
        </div>
        {editarea}
    </div>;
};
