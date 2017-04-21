import {
    connect,
} from 'react-redux';

import {
    moveStartPanelAction,
    moveStartRemainsAction,
    moveOverPanelAction,
    moveOverRemainsAction,
    moveOverNoneAction,
    moveEndAction,
} from '../action/edit';

import BoardComponent from '../component/board';

const BoardContainer = connect(
    ({panel})=>({
        size: panel.size,
    }),
    (dispatch)=>{
        return {
            moveFromPanel(x: number, y: number){
                dispatch(moveStartPanelAction({
                    x,
                    y,
                }));
            },
            moveFromRemains(idx: number){
                dispatch(moveStartRemainsAction({
                    idx,
                }));
            },
            moveOverPanel(x: number, y: number){
                dispatch(moveOverPanelAction({
                    x,
                    y,
                }));
            },
            moveOverRemains(){
                dispatch(moveOverRemainsAction());
            },
            moveOverNone(){
                dispatch(moveOverNoneAction());
            },
            moveEnd(){
                dispatch(moveEndAction() as any);
            },
        };
    },
)(BoardComponent);

export default BoardContainer;
