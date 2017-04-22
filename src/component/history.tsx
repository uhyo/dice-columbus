import * as React from 'react';
import {
    HistoryState,
} from '../reducer/history';

export interface IPropHistory{
    history: HistoryState;
    onBack(): void;
    onForward(): void;
}

export default ({
    history: {prev, forward},
    onBack,
    onForward,
}: IPropHistory)=>{
    let prevButton, forwardButton;

    if (prev.length === 0){
        prevButton = <div className="history-button history-button-disabled">
            一手戻す
        </div>;
    }else{
        const backHandler = (e: React.MouseEvent<HTMLElement>)=>{
            e.preventDefault();
            onBack();
        };
        prevButton = <div className="history-button" onClick={backHandler}>
            一手戻す
        </div>;
    }

    if (forward.length === 0){
        forwardButton = <div className="history-button history-button-disabled">
            一手進む
        </div>;
    }else{
        const forwardHandler = (e: React.MouseEvent<HTMLElement>)=>{
            e.preventDefault();
            onForward();
        };
        forwardButton = <div className="history-button" onClick={forwardHandler}>
            一手進む
        </div>;
    }

    return <div className="history-wrapper">
        {prevButton}
        {forwardButton}
    </div>;
};
