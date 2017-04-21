export interface MoveStartPanelAction{
    type: 'movestart-panel';
    x: number;
    y: number;
}
export interface MoveStartRemainsAction{
    type: 'movestart-remains';
    idx: number;
}
export interface MoveOverPanelAction{
    type: 'moveover-panel';
    x: number;
    y: number;
}
export interface MoveOverRemainsAction{
    type: 'moveover-remains';
}
export interface MoveOverNoneAction{
    type: 'moveover-none';
}
export interface MoveEndAction{
    type: 'moveend';
}

export function moveStartPanelAction(obj: {
    x: number;
    y: number;
}){
    return {
        type: 'movestart-panel',
        ... obj,
    };
}

export function moveStartRemainsAction(obj: {
    idx: number;
}){
    return {
        type: 'movestart-remains',
        ... obj,
    };
}

export function moveOverPanelAction(obj: {
    x: number;
    y: number;
}): MoveOverPanelAction{
    return {
        type: 'moveover-panel',
        ... obj,
    };
}

export function moveOverRemainsAction(): MoveOverRemainsAction{
    return {
        type: 'moveover-remains',
    };
}

export function moveOverNoneAction(): MoveOverNoneAction{
    return {
        type: 'moveover-none',
    };
}

export function moveEndAction(){
    return (dispatch: any, getState: any)=>{
        const {
            edit,
        } = getState();
        if (edit.move != null){
            const {
                from,
                to,
            } = edit.move;
            if (from != null && to != null){
                // 場所を入れ替える
                dispatch({
                    type: 'tile-move',
                    from,
                    to,
                });
            }
        }
        dispatch({
            type: 'moveend',
        })
    };;
}

/*
function handleMoveAround(eventtype: 'mouse' | 'touch', dispatch: any): void{
    if (eventtype === 'mouse'){
        const handler = (e: MouseEvent)=>{
            if (e.button === 0){
                dispatch(moveEndAction());
                document.removeEventListener('mouseup', handler, false);
            }
        };
        document.addEventListener('mouseup', handler, false);
    }else{
        const handler = ()=>{
            dispatch(moveEndAction());
            document.removeEventListener('touchend', handler, false);
            document.removeEventListener('touchcancel', handler, false);
        };
            document.addEventListener('touchend', handler, false);
        document.addEventListener('touchcancel', handler, false);
    }
}
*/

export type EditAction =
    MoveStartPanelAction |
    MoveStartRemainsAction |
    MoveOverPanelAction |
    MoveOverRemainsAction |
    MoveOverNoneAction |
    MoveEndAction;
