import {
    connect,
} from 'react-redux';

import {
    moveStartPanelAction,
    moveOverPanelAction,
} from '../action/edit';

import PanelComponent from '../component/panel';

const PanelContainer = connect(
    ({panel, edit})=>({panel, edit}),
    (dispatch)=>{
        return {
            moveStart({type, x, y}: {type: 'mouse' | 'touch'; x: number; y: number; }){
                dispatch(moveStartPanelAction({
                    eventtype: type,
                    x,
                    y,
                }));
            },
            moveOver({x, y}: {x: number; y: number; }){
                dispatch(moveOverPanelAction({
                    x,
                    y,
                }));
            },
        } as any;
    },
)(PanelComponent);

export default PanelContainer;

