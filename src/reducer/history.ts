import {
    Action,
} from '../action/index';
import {
    PanelState,
} from './panel';

export interface HistoryState{
    prev: Array<PanelState>;
    forward: Array<PanelState>;
}

const initialState: HistoryState = {
    prev: [],
    forward: [],
};

export default function reducer(state = initialState, action: Action){
    switch(action.type){
        case 'history-back': {
            const l = state.prev.length;
            if (l === 0){
                return state;
            }
            return {
                prev: state.prev.slice(0, l-1),
                forward: [
                    action.panel,
                    ... state.forward,
                ],
            };
        }
        case 'history-forward': {
            const l = state.forward.length;
            if (l === 0){
                return state;
            }
            return {
                prev: [
                    ... state.prev,
                    action.panel,
                ],
                forward: state.forward.slice(1),
            };
        }
        case 'history-add': {
            return {
                prev: [
                    ... state.prev,
                    action.panel,
                ],
                forward: [],
            };
        }
        default: {
            return state;
        }
    }
}
