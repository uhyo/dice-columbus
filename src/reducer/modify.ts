import {
    Action,
} from '../action/index';

export interface EditorState{
    open: boolean;
}

const initialState: EditorState = {
    open: false,
};

export default function reducer(state: EditorState = initialState, action: Action): EditorState{
    switch(action.type){
        case 'open-close': {
            return {
                open: action.open,
            };
        }
        default: {
            return state;
        }
    }
}
