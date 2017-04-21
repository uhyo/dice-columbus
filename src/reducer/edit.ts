import {
    Action,
} from '../action/index';

export interface EditState{
    move: Move | undefined;
}

export interface Move{
    from: MovePosition;
    to: MovePosition | undefined;
}
export type MovePosition = PanelPosition | RemainsPosition;
export interface PanelPosition{
    type: 'panel';
    x: number;
    y: number;
}
export interface RemainsPosition{
    type: 'remains';
    idx: number;
}

const initialState = {
    // move: undefined,
    move: void 0,
};

export default function reducer(state: EditState = initialState, action: Action): EditState{
    switch(action.type){
        case 'movestart-panel': {
            return {
                move: {
                    from: {
                        type: 'panel',
                        x: action.x,
                        y: action.y,
                    },
                    to: {
                        type: 'panel',
                        x: action.x,
                        y: action.y,
                    },
                },
            };
        }
        case 'movestart-remains': {
            return {
                move: {
                    from: {
                        type: 'remains',
                        idx: action.idx,
                    },
                    to: {
                        type: 'remains',
                        idx: action.idx,
                    },
                },
            };
        }
        case 'moveover-panel': {
            const m = state.move;
            if (m == null){
                return state;
            }
            return {
                move: {
                    ... m,
                    to: {
                        type: 'panel',
                        x: action.x,
                        y: action.y,
                    },
                },
            };
        }
        case 'moveover-remains': {
            const m = state.move;
            if (m == null){
                return state;
            }
            return {
                move: {
                    ... m,
                    to: {
                        type: 'remains',
                        idx: 0,
                    },
                },
            };
        }
        case 'moveover-none': {
            if (state.move == null){
                return state;
            }
            return {
                move: {
                    ... state.move,
                    to: void 0,
                },
            };
        }
        case 'moveend': {
            return {
                move: void 0,
            };
        }
        default: {
            return state;
        }
    }
}
