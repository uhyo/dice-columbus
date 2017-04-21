import {
    connect,
} from 'react-redux';

import {
    moveStartRemainsAction,
    moveOverRemainsAction,
} from '../action/edit';

import RemainsComponent from '../component/remains';

const RemainsContainer = connect(
    ({panel, edit})=>({panel, edit}),
    (dispatch)=>{
        return {
            moveStart({type, idx}: any){
                dispatch(moveStartRemainsAction({
                    eventtype: type,
                    idx,
                }));
            },
            moveOver(){
                dispatch(moveOverRemainsAction());
            },
        } as any;
    },
)(RemainsComponent);

export default RemainsContainer;

