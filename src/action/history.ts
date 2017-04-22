import {
    PanelState,
} from '../reducer/panel';

export interface HistoryBackAction{
    type: 'history-back';
    panel: PanelState;
}
export interface HistoryForwardAction{
    type: 'history-forward';
    panel: PanelState;
}
export interface AddHistoryAction{
    type: 'history-add';
    panel: PanelState;
}

export function historyBackAction(){
    return (dispatch: any, getState: any)=>{
        const {
            history: {
                prev,
            },
            panel,
        } = getState();
        if (prev.length === 0){
            return;
        }
        const nextPanel = prev[prev.length-1];
        dispatch({
            type: 'set-panel',
            panel: nextPanel,
        });
        dispatch({
            type: 'history-back',
            panel,
        });
    }
}
export function historyForwardAction(){
    return (dispatch: any, getState: any)=>{
        const {
            history: {
                forward,
            },
            panel,
        } = getState();
        if (forward.length === 0){
            return;
        }
        const nextPanel = forward[0];
        dispatch({
            type: 'set-panel',
            panel: nextPanel,
        });
        dispatch({
            type: 'history-forward',
            panel,
        });
    };
}
export function addHistoryAction(panel: PanelState){
    return {
        type: 'history-add',
        panel,
    };
}
export function addCurrentHistoryAction(){
    return (dispatch: any, getState: any)=>{
        const {
            panel,
        } = getState();
        dispatch(addHistoryAction(panel));
    };
}

export type HistoryAction =
    HistoryBackAction |
    HistoryForwardAction |
    AddHistoryAction;
